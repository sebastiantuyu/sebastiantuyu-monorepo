import * as THREE from "three";
import { MeshLambertMaterial, Vector3 } from "three";
import Entity from "../Entity";

class Door extends Entity {
  loader = new this.three.TextureLoader();
  wheatMapping: number[][] = [];
  x: number = 0;
  y: number = 0;

  constructor() {
    super();
    this.v = "1650734593";
  }

  async load() {
    const textLoaded = await this.loader
      .loadAsync(this.baseURI + "door_v2_d4ivvu.png");
    //this.texture = new THREE.MeshLambertMaterial({
    //  map: textLoaded,
    //});
    this.cube = new this.three.BoxGeometry(this.size, this.size*2, this.size * 0.25);

    //const sideTexture = await this.loader
    //.loadAsync(this.baseURI + "grass__side_ittaq5.png");
    const sideTexture = 0x593E1F
    //const topTexture = await this.loader
    //.loadAsync(this.baseURI + "grass_top_dsxpf7.png");


    this.texture = [
      new this.three.MeshLambertMaterial({ color: sideTexture }),
      new this.three.MeshLambertMaterial({ color: sideTexture }),
      new this.three.MeshLambertMaterial({ color: sideTexture }),
      new this.three.MeshLambertMaterial({ color: sideTexture }),
      new this.three.MeshLambertMaterial({ color: sideTexture }),
      new this.three.MeshLambertMaterial({ map: textLoaded }),
    ];
  }
}

export default Door;
