import * as THREE from "three";
import { BoxGeometry, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, PlaneGeometry } from "three";

class Entity {
  size: number = 1;
  three: typeof THREE = THREE;
  loader = new this.three.TextureLoader();
  texture: MeshLambertMaterial[] | MeshLambertMaterial | MeshStandardMaterial[] | MeshStandardMaterial | MeshBasicMaterial | MeshBasicMaterial[] | any = [];
  cube: BoxGeometry | PlaneGeometry = new this.three.BoxGeometry(this.size, this.size, this.size);
  v: string = "1647721378";
  texturePack = "";
  // eslint-disable-next-line max-len
  //https://res.cloudinary.com/dwd2eaext/image/upload/v1650820799/portfolio/softer/grass_origin_side_fexdwv.png
  baseURI: string = this.texturePack === ""
  ? `https://res.cloudinary.com/dwd2eaext/image/upload/v${this.v}/portfolio/`
  : `https://res.cloudinary.com/dwd2eaext/image/upload/v$${this.v}/portfolio/${this.texturePack}/`;

  baseURI_ = () => this.texturePack === "" || this.texturePack === 'classic'
  ? `https://res.cloudinary.com/dwd2eaext/image/upload/v${this.v}/portfolio/`
  : `https://res.cloudinary.com/dwd2eaext/image/upload/v${this.v}/portfolio/${this.texturePack}/`;

  renderInstacedMesh(size: number) {
    const iMesh = new THREE.InstancedMesh(this.cube, this.texture, size);
    iMesh.castShadow = true;
    return iMesh;
  }
}

export default Entity;
