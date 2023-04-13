import perlin from "~/services/PerlinService";
import * as THREE from "three";
import LeavesCube from "./cubes/LeavesCube";
import WoodCube from "./cubes/WoodCube";

class BaseTreeChunck {
  TREES_DENSITY = 0.5;
  x: number = 0;
  y: number = 0;
  _mapSize: number = 0;
  calcWoodsNum = 0;
  woodsMapping: number[][] = [];
  woodsCounter = 0;
  read = true;
  leavesTexture = new LeavesCube();
  woodTexture = new WoodCube();
  cubeId2 = 0;
  iLeavesMesh = {} as any;

  constructor(x: number, y: number) {
    this._mapSize = x * y;
    this.x = x;
    this.y = y;
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


  resolveMapping() {
    let probabilityOfTree = 200;
    for(let i=0;i<this.x;i++) {
      this.woodsMapping.push([]);
        for(let j=0;j<this.y;j++){
                let _randPosition = Math.floor(Math.random()* (probabilityOfTree + 1*i));
                if(this.read){
                  if(_randPosition === 1){
                    this.woodsMapping[i][j] = 1;
                    this.woodsCounter++;
                  } else {
                    this.woodsMapping[i][j] = 0;
                  }
                } else {
                  this.woodsMapping[i][j] = 0;
                }
      }
    }
  }

  isRandom(callback: () => void, randomness: number = 1, ) {
    const shouldPlace = Math.floor(Math.random() * randomness + 1);
    if(shouldPlace === 1) callback();
  }

  leavesLayer(x: number, y: number, z: number, layer: number = 2, randomize: boolean = true) {
    const getPos = () => {
      let top = []
      let back = []
      for(let i=0;i<layer;i++) {
        if(i !== 0) top.push(i);
        if(-i !== -0) back.push(-i);
      }
      return back.reverse().concat(0).concat(top.reverse());
    }
    const pos = getPos();

    pos.forEach((n) => {
      pos.forEach((sn) => {
        let _x = x+n;
        let _y = y+sn;

        this.isRandom(() => {
          let tMat = new THREE.Matrix4().makeTranslation(
            _x,
            z,
            _y
            );
          this.iLeavesMesh.setMatrixAt(this.cubeId2,tMat);
          this.cubeId2++;
        }, randomize ? 3 : 1);
      });
    });
  }

  async generate(textureMapping: number[][], cords: number[][], x?: number, y?: number) {
    if(x) this.x = x;
    if(y) this.y = y;
    this.resolveMapping();
    this.calcWoodsNum = Math.floor(Math.random()* this._mapSize * this.TREES_DENSITY);

    let woodHeight = 24; // max height of wood
    await Promise.all([
      this.leavesTexture.load(),
      this.woodTexture.load()
    ]);

    const iWoodMesh =  this.woodTexture.renderInstacedMesh(woodHeight * this.calcWoodsNum);
    this.iLeavesMesh = this.leavesTexture.renderInstacedMesh(this.calcWoodsNum * 10);

    let cubeId = 0;
    const changeTreesHeight = (current: number) => {
      if(current > Math.floor(this.x / 2)) {
        woodHeight = 7;
      }
    }

    for(let _x=0;_x<this.x;_x++){
        changeTreesHeight(_x);
        for(let _y=0;_y<this.y;_y++){
            if(this.woodsMapping[_x][_y] === 1){
                // Ensure that the block on the bottom is ONLY grass
                if(textureMapping[_x][_y] === 1) {
                    const currentHeight = Math.floor(Math.random()* (woodHeight - 3 + 1) + 3);
                    if(currentHeight < 18) {
                      // Tree
                      for(let j =0;j<currentHeight;j++){
                        let tMat = new THREE.Matrix4().makeTranslation(
                          _x,
                          cords[_x][_y]+j,
                          _y
                          );
                        iWoodMesh.setMatrixAt(cubeId,tMat);
                        cubeId++;
                      }
                    } else {
                      for(let j =0;j<currentHeight;j++){
                        [-1, 0].forEach((nX) => {
                          [-1, 0].forEach((nY) => {
                            let tMat = new THREE.Matrix4().makeTranslation(
                              _x+nX,
                              cords[_x][_y]+j,
                              _y+nY
                              );
                            iWoodMesh.setMatrixAt(cubeId,tMat);
                            cubeId++;
                          });
                        });
                      }
                    }

                    //leaves layer
                    [3,3,2,1].forEach((j,idx) => {
                        this.leavesLayer(
                          _x,
                          _y,
                          cords[_x][_y]+currentHeight+idx-1,
                          j,
                          j > 2
                        )

                        if(j > 2) {
                          this.leavesLayer(
                            _x,
                            _y,
                            cords[_x][_y]+currentHeight+idx-1,
                            2,
                            false
                          )
                        }
                      })
                }
            }
        }
    }

    console.info("Done building trees");
    return [
      iWoodMesh,
      this.iLeavesMesh
    ];
  }

}

export default BaseTreeChunck;
