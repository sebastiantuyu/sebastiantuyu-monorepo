import * as THREE from "three";
import {
  PointerLockControls
} from "three/examples/jsm/controls/PointerLockControls";


class BaseScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  canvas: any;
  controls: PointerLockControls;

  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  constructor(window: any, document: any) {
    this.canvas = document.querySelector("canvas#webgl-target") ??
        document.createElement("canvas");

    // eslint-disable-next-line no-undef
    if((this.canvas as HTMLElement).getAttribute("id") === null) {
      console.error("Canvas not founded");
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.z = 10;

    const mainLight = new THREE.DirectionalLight(0xcccccc, 0.55); //1.5
    const sLight = new THREE.DirectionalLight(0xcccccc, 0.55); //1.5

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.75); //0.8
    this.controls = new PointerLockControls(this.camera, this.canvas);

    mainLight.position.set(0,-2500,-2500).normalize();
    sLight.position.set(2500,2500,0).normalize();
    mainLight.castShadow = true;
    sLight.castShadow = true;
    //this.scene.add(mainLight);
    //this.scene.add(sLight);
    this.scene.add(ambientLight);
    this.scene.add(this.controls.getObject());

  }

  add(elements: any) {
    this.scene.add(elements);
  }
}

export default BaseScene;
