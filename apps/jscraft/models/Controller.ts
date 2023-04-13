import * as THREE from "three";
import
{ PointerLockControls }
from "three/examples/jsm/controls/PointerLockControls";

class BaseController {
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();
  controls: PointerLockControls;

  constructor(controls: PointerLockControls) {
    this.controls = controls;
  }

  keyUp(event: any) {
    switch ( event.code ) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = false;
          break;

      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = false;
          break;

      case "ArrowDown":
      case "KeyS":
        this.moveBackward = false;
          break;

      case "ArrowRight":
      case "KeyD":
        this.moveRight = false;
          break;
      //case "Space":
      //  this.canJump = false;
      //  break;
    }
  }

  keyDown(event: any, world: any, controls: any, callback?: () => void) {
    switch ( event.code ) {
      case "KeyH":
        (this as any).$root.$emit("toggle-instructions");
        if(controls.isLocked) controls.unlock();
        else controls.lock();

        if(callback)  callback();
          break;

      case "ArrowUp":
      case "KeyW":
        world.moveForward = true;
          break;

      case "ArrowLeft":
      case "KeyA":
        world.moveLeft = true;
          break;

      case "ArrowDown":
      case "KeyS":
        world.moveBackward = true;
          break;

      case "ArrowRight":
      case "KeyD":
        world.moveRight = true;
          break;

      case "KeyE":
        (this as any).$root.$emit("change-inventory-element");
        break;

      //case "Space":
      //  world.canJump = true;
      //  if(world.velocity.y < 5) world.velocity.y += 0.25;
      //  break;
   }

  }
}

export default BaseController;
