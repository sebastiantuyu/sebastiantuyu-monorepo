import * as THREE from "three";
import { MeshLambertMaterial, Vector3 } from "three";
import Entity from "../Entity";

class Wheat extends Entity {
  loader = new this.three.TextureLoader();
  wheatMapping: number[][] = [];
  x: number = 0;
  y: number = 0;
  wheatCounter: number = 0;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    //this.textureMapping = textureMapping;
    //this.globalCords = globalCords;
  }

  async load() {
    this.v = "1650820854";
    this.texturePack = localStorage.getItem("texture") || "";
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "wheat_nc0zdv.png");
    this.texture = new THREE.MeshLambertMaterial({
      map: textLoaded,
      side: THREE.DoubleSide,
      transparent: true
    });
    this.cube = new THREE.PlaneGeometry(1,1);
  }

  resolveMapping() {
    let probabilityOfWheat = 500;
    for(let i=0;i<this.x;i++) {
      this.wheatMapping.push([]);
        for(let j=0;j<this.y;j++){
          let _randPosition = Math.floor(Math.random()*(200 - (i*0.25)));
          if(_randPosition === 1){
            this.wheatMapping[i][j] = 1;
            this.wheatCounter++;
          } else {
            this.wheatMapping[i][j] = 0;
          }
      }
    }
  }

  async renderWheatMesh(textureMapping: number[][], globalCords: number[][], x?: number, y?: number) {
    if(x) this.x = x;
    if(y) this.y = y;

    await this.load();
    this.resolveMapping();
    const totalAmount = this.x * this.y;

    let iWheatMesh = this.renderInstacedMesh(this.wheatCounter);
    let iWheatMesh2 = this.renderInstacedMesh(this.wheatCounter);
    let wheatMeshId = 0;

    const rotation = new THREE.Matrix4().makeRotationY(0.25*Math.PI);

    for(let _x=0;_x<this.x;_x++) {
      for(let _y=0;_y<this.y;_y++){
        if(textureMapping[_x][_y] === 1 && this.wheatMapping[_x][_y] === 1) {
          let tMat = new THREE.Matrix4().makeTranslation(
            _x,
            globalCords[_x][_y],
            _y
            );

            //tMat.makeRotationZ(0.392699)
            //(0.25*Math.PI);
          let tMat2 = new THREE.Matrix4().makeTranslation(
            _x,
            globalCords[_x][_y],
            _y
            );
            //.makeRotationY(-0.25*Math.PI);
          iWheatMesh.setMatrixAt(wheatMeshId, tMat);
          iWheatMesh2.setMatrixAt(wheatMeshId,tMat2);
              //iWheatMesh.position.set(_x+6,
              //  this.globalCords[_x+6][_y]+1,
              //  _y)
              //iWheatMesh2.position.set(_x+6,
              //  this.globalCords[_x+6][_y]+1,
              //  _y)

          wheatMeshId++;
        }
      }
    }

    return [
      iWheatMesh,
      //iWheatMesh2
    ];
  }

}

export default Wheat;
