import { MeshLambertMaterial } from "three";

export interface ICube {
  size: number;
  texture: MeshLambertMaterial[] | MeshLambertMaterial;
}
