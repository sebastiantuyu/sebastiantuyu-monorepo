import perlin from "~/services/PerlinService";
import CloudCube from "../cubes/CloudCube";
import * as THREE from "three";

class CloudChunck {
  x: number;
  y: number;
  _z: number;
  cords: number[][] = [];
  cloudCube: CloudCube = new CloudCube();
  iCloudMesh: any;
  textureMapping: number[][] = [];

  constructor(x: number, y: number, _z: number) {
    this.x = x;
    this.y = y;
    this._z = _z;
  }

  makePerlinNoise(): number[][] {
    let firstPlane: number[][] = [];
    let halfHeight = Math.round(this._z/2)*0.5;
    let _scale = 0.03;
    let _xS = 0.7;
    for(let i =0;i<this.x;i++){
        firstPlane.push([]);
        for(let j=0;j<this.y;j++){
            let perlinResponse = perlin.get(j*_scale,i*_scale)*this._z * _xS;
            let z = (typeof(perlinResponse) === "string")
            ? parseInt(perlinResponse)
            : perlinResponse;
            firstPlane[i][j] = Math.round(z);
        }

        //if((_z * _xS) > -halfHeight){
        //    _xS -= 0.000125*i;
        //}
    }

    return firstPlane;
  }


  async generate(x?: number, y?: number) {
    if(x) this.x = x;
    if(y) this.y = y;
    this.cords = this.makePerlinNoise();
    let HALF_X = Math.round(this._z*0.15);
    for(let _x=0;_x<this.x;_x++){
      this.textureMapping.push([]);
      for(let _y =0;_y<this.y;_y++){
          if(this.cords[_x][_y] > HALF_X) {
            this.textureMapping[_x][_y] = 1;
          } else {
            this.textureMapping[_x][_y] = 0;
          }
      }
    }


    await this.buildCloudMesh();
    return this.iCloudMesh;
  }

  async buildCloudMesh() {
    await this.cloudCube.load();
    this.iCloudMesh = this.cloudCube.renderInstacedMesh(Math.floor(this.x * this.y * 3 * 0.35));
    let cloudCubeId = 0;

    for(let _x=0;_x<this.x;_x++){
      for(let _y =0;_y<this.y;_y++) {
        if(this.textureMapping[_x][_y] === 1) {
          for(let cloudHeight=0;cloudHeight<3;cloudHeight++) {
            let tMat = new THREE.Matrix4().makeTranslation(
              _x,
              70+cloudHeight, //fixed height for clouds layer
              _y
              );
            this.iCloudMesh.setMatrixAt(cloudCubeId,tMat);
            cloudCubeId++;
          }
        }
      }
    }
  }
}

export default CloudChunck;
