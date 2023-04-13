import { ICube } from "@/dtos/DTOs";
//import { MeshLambertMaterial } from "three";
//import * as THREE from "three";
import Entity from "../Entity";

class BaseCube extends Entity implements ICube {
  generateSimple() {
    return new this.three.Mesh(this.cube, this.texture);
  }
}

export default BaseCube;
