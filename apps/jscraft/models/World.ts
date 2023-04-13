/* eslint-disable max-len */
import perlin from "~/services/PerlinService";
import * as THREE from "three";
import WaterCube from "./cubes/WaterCube";
import SandCube from "./cubes/SandCube";
import StoneCube from "./cubes/StoneCube";
import DirtCube from "./cubes/DirtCube";
import GrassCube from "./cubes/GrassCube";
import BaseTreeChunck from "./TreeChunck";
import CloudChunck from "./clouds/CloudChunck";
import { GlobalEventEmitter } from "~/utils/GlobalEmitter";
import Wheat from "./wheat/Wheat";
import Engine from "./engine/Engine";
import WoodCube from "./cubes/WoodCube";

class BaseWorld {
  dirtCube: DirtCube = new DirtCube();
  grassCube: GrassCube = new GrassCube();
  stoneCube: StoneCube = new StoneCube();
  waterCube: WaterCube = new WaterCube();
  sandCube: SandCube = new SandCube();
  woodCube: WoodCube = new WoodCube();
  globalSize: number[] = [
    parseInt(localStorage.getItem('world-size-x') || '600'), // 600
    parseInt(localStorage.getItem('world-size-z') || '300'), // 300
    parseInt(localStorage.getItem('world-size-y') || '50'), //
  ];

  treesChunck: BaseTreeChunck = new BaseTreeChunck(this.globalSize[0], this.globalSize[1]);
  cloudChunck: CloudChunck = new CloudChunck(this.globalSize[0], this.globalSize[0], 25);
  wheatChunck: Wheat = new Wheat(this.globalSize[0], this.globalSize[1]);

  stoneBlocks: number = 0;
  waterBlocks: number = 0;
  dirtBlocks: number = 0;
  grassBlocks: number = 0;
  sandBlocks: number = 0;

  STONE_LEVEL: number = 0;
  WATER_LEVEL: number = 0;
  MOUNTAIN_LEVEL: number = 0;

  globalCords: number[][] = [];
  textureMapping: number[][] = [];
  prevTime = performance.now();
  objects = [];
  plainMode: boolean = false;

  initialPosition: number[] = Array(2);
  mouse = new THREE.Vector3(0,0.00017,0.5);

  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();

  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  async loadCubesTextures() {
    await Promise.all([
      this.dirtCube.load(),
      this.sandCube.load(),
      this.stoneCube.load(),
      this.waterCube.load()
    ]).then(() => true);
  }

  setInitialPosition() {

    let _big;
    let counter = 0;
    let sizeX = this.globalCords.length;
    let sizeY = this.globalCords[0].length;
    let _finalCords = Array(2);
    for(let x = Math.round(sizeX*0.65);x<sizeX;x++){
        for(let y = Math.round(sizeY*0.65);y<sizeY;y++){
            if(counter == 0){
                _big = this.globalCords[x][y];
                _finalCords[0] = x;
                _finalCords[1] = y;
              //@ts-ignore
            } else if (this.globalCords[x][y] > _big){
                _big = this.globalCords[x][y];
                _finalCords[0] = x;
                _finalCords[1] = y;
            }
            counter++;
        }
    }

    //camera.position.set
    return [
      _finalCords[0],
      this.globalCords[_finalCords[0]][_finalCords[1]]+3,
      _finalCords[1]
    ];
    //initialPosition = _finalCords;
  }


  async generate(x: number, y: number, z: number, plainMode: boolean = false) {
    console.log(this.globalSize);
    this.plainMode = plainMode;
    this.globalSize[0] = x;
    this.globalSize[1] = y;
    let _cords = plainMode ? this.generatePlainCords(x,y,z) : this.generateCords(x,y,z);
    this.globalCords = _cords;
    if(!plainMode) {
      this.STONE_LEVEL =  Math.round(Math.floor(z/2)*-1*0.3);
      this.WATER_LEVEL = Math.round(Math.floor(z/2)*-1*0.5);
      this.MOUNTAIN_LEVEL = Math.round(Math.floor(z/2)*0.05);
      GlobalEventEmitter.$emit("loader-status-msg", 'Generating mountains...');
    }
    let DEEPEST_LAYER = (Math.round(z/2)*-1);
    this.setTextureMapping(x,y,_cords);
    return await this.fill(x,y,_cords,DEEPEST_LAYER);
  }

  generateCords(x: number, y: number, _z: number): number[][] {
    let firstPlane: number[][] = [];
    let halfHeight = Math.round(_z/2)*0.5;
    let _scale = 0.025;
    let _xS = 1;
    for(let i =0;i<x;i++){
        firstPlane.push([]);
        for(let j=0;j<y;j++){
            let perlinResponse = perlin.get(j*_scale,i*_scale)*_z * _xS;
            let z = (typeof(perlinResponse) === "string")
            ? parseInt(perlinResponse)
            : perlinResponse;
            firstPlane[i][j] = Math.round(z);
        }

        if((_z * _xS) > -halfHeight){
            _xS -= 0.000125*i;
        }

    }

    return firstPlane;
  }

  generatePlainCords(x: number, y: number, _z: number): number[][] {
    let firstPlane: number[][] = [];
    for(let i =0;i<x;i++){
        firstPlane.push([]);
        for(let j=0;j<y;j++){
            firstPlane[i][j] = 1;
        }
    }
    return firstPlane;
  }

  setTextureMapping(x: number, y: number, _cords: number[][]) {
    let HALF_X = Math.round(x/2);
    for(let _x=0;_x<x;_x++){
        this.textureMapping.push([]);
        for(let _y =0;_y<y;_y++){
            let _color = this._pickTextureBlock(_cords[_x][_y],HALF_X,_x);
            this.textureMapping[_x][_y] = _color;
        }
    }
  }

  _pickTextureBlock(height: number, hX: number, x: number) {
            //grass
            let _color = 1;

            if(height < this.WATER_LEVEL) {
                //water
                _color = 4;
                this.waterBlocks++;
                return _color;

            }
            else if(height < this.STONE_LEVEL ) {
                //stone
                _color = 3;
                this.stoneBlocks++;
                return _color;
            }
            else if(height < -3 ) {
                //sand
                if(x>hX){
                _color = 4;
                this.waterBlocks++;
                return _color;
                }
            }

            else if(height > this.MOUNTAIN_LEVEL) {
                //Only moountains on half map
                if(x<hX*0.8 && !this.plainMode){
                _color = 3;
                this.stoneBlocks++;
                return _color;
                }
            }

            //grass NOT dirt
            this.dirtBlocks++;
            return _color;
  }

  async fill(x: number, y: number, _cords: number[][], DEEPEST_LAYER: number) {
    let FILLED_LAYERS = 1;
    const centerMap = [
      Math.floor(x / 2), //x-100,
      Math.floor(y / 2), //y-100,
    ]

    let iCloudMesh = undefined;
    let iWeathMesh = undefined;
    const iGrassMesh = this.grassCube.renderInstacedMesh(this.dirtBlocks * FILLED_LAYERS);
    const iSandMesh = this.sandCube.renderInstacedMesh(this.sandBlocks   * FILLED_LAYERS);
    const iStoneMesh = this.stoneCube.renderInstacedMesh(this.stoneBlocks * FILLED_LAYERS);
    const iWaterMesh = this.waterCube.renderInstacedMesh(this.waterBlocks  * FILLED_LAYERS);
    const treesMesh = await this.treesChunck.generate(
      this.textureMapping,
      this.globalCords,
      this.globalSize[0],
      this.globalSize[1]
    );

    if((localStorage.getItem('clouds') || undefined) === 'true') {
      iCloudMesh = await this.cloudChunck.generate(
        this.globalSize[0],
        this.globalSize[1],
      );
    }

    if((localStorage.getItem('grass') || undefined) === 'true') {
      iWeathMesh = await this.wheatChunck.renderWheatMesh(
        this.textureMapping,
        this.globalCords,
        this.globalSize[0],
        this.globalSize[1]
      );
    }

    const buildingMesh = await Engine.build(
      centerMap[0],
      centerMap[1],
      this.globalCords[centerMap[0]][centerMap[1]],
      this.globalCords
    );

    let idGrassCube = 0;
    let idSandCube  = 0;
    let idWaterCube = 0;
    let idStoneCube = 0;

    for(let _x=0;_x<x;_x++){
        for(let _y =0;_y<y;_y++){
                if(_cords[_x][_y] > DEEPEST_LAYER ) {
                    for(let _z = (_cords[_x][_y]-FILLED_LAYERS);_z<_cords[_x][_y];_z++){

                        let _choice = this.textureMapping[_x][_y];
                        let tMat
                        if(_choice === 4 && (_x > Math.floor(x / 2))) {
                          tMat = new THREE.Matrix4().makeTranslation(
                            _x,
                            -5,
                            _y
                            );
                        } else {
                          tMat = new THREE.Matrix4().makeTranslation(
                            _x,
                            _z,
                            _y
                            );
                        }


                            if(_choice === 1) {
                                iGrassMesh.setMatrixAt(idGrassCube,tMat);
                                iGrassMesh.setColorAt(idGrassCube, (new THREE.Color()).setHex(0xffffff));
                                idGrassCube++;
                            }
                            else if (_choice === 2) {
                                iSandMesh.setMatrixAt(idSandCube,tMat);
                                idSandCube++;
                            }
                            else if (_choice === 3){
                                iStoneMesh.setMatrixAt(idStoneCube,tMat);
                                idStoneCube++;
                            }
                            else if (_choice === 4){
                                iWaterMesh.setMatrixAt(idWaterCube,tMat);
                                idWaterCube++;
                            }
                    }
                }

            }
        }

    return [
      iGrassMesh,
      iSandMesh,
      iStoneMesh,
      iWaterMesh,
      iCloudMesh,
      iWeathMesh,
    ]
    .concat(buildingMesh)
    .concat(treesMesh)
    .filter(mesh => mesh !== undefined)
  }
}

export const World = new BaseWorld();
