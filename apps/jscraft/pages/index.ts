/* eslint-disable no-undef */
import Vue from "vue";
import * as THREE from "three";
import BaseScene from "~/models/Scene";
import { World } from "~/models/World";
import Controller from "~/models/Controller";
//import Joystick from "~/components/joystick/Joystick";
import Loader from "~/components/loader/Loader";
import Inventory from "~/components/inventory/Inventory";
import Instructions from "~/components/instructions/Instructions";
import BoxButton from "~/components/boxButton/BoxButton";
import BoxText from "~/components/boxText/BoxText";
import DeadScreen from "~/components/deadScreen/DeadScreen";
import { GlobalEventEmitter } from "~/utils/GlobalEmitter";

// @ts-ignore
import info from "~/package.json";
import ConfigurationMenu from "~/components/configurationMenu/ConfigurationMenu";

const version = info.version;

export default Vue.extend({
  components: {
    //Joystick,
    Loader,
    Inventory,
    Instructions,
    BoxButton,
    BoxText,
    DeadScreen,
    ConfigurationMenu
  },
  data() {
    return {
      showCover: true,
      isLoading: true,
      showConfig: false,
      scene: {} as BaseScene,
      camera: null as any,
      mesh: null as any,
      renderer: null as any,
      controller: {} as Controller,
      version: version,
      isDead: false,
      username: "",
      loaderMessage: "",
      meshBulding: [] as any[],
    };
  },
  computed: {
    isMobile(): boolean {
      return window.innerWidth <= 720;
    },
    isUsernameValid(): boolean {
      return this.username.length > 3;
    },
    shouldShowConfig(): boolean {
      return this.showConfig;
    }
  },
  created() {
    localStorage.setItem('world-size-x', '600');
    localStorage.setItem('world-size-z', '300');
    localStorage.setItem('world-size-y', '50');

    this.$root.$on("canvas-loaded", () => this.isLoading = false);
    this.$root.$on("safe-exit-world", () => this.isDead = true);

    GlobalEventEmitter.$on("loader-status-msg", (msg: string) => {
      this.loaderMessage = msg;
    });
  },
  beforeDestroy() {
    this.$root.$off("canvas-loaded");
  },
  mounted() {
  },
  methods: {
    startDemo() {
      this.showConfig = false;
      this.showCover = false;
      GlobalEventEmitter.$emit("loader-status-msg", 'Building world...');
      setTimeout(() => this.buildWorld(), 1000);
    },
    async buildWorld() {
      this.scene = new BaseScene(window, document);
      let canvas = this.scene.canvas;
      this.controller = new Controller(this.scene.controls);
      GlobalEventEmitter.$emit("loader-status-msg", 'Generating textures...');
      await Promise.all([
        World.sandCube.load(),
        World.dirtCube.load(),
        World.waterCube.load(),
        World.stoneCube.load(),
        World.grassCube.load()
      ])

      await this.timeoutSync(1000);

      const waterCube = World.grassCube;
      await waterCube.load();
      this.mesh = waterCube.generateSimple();

      this.scene.add(this.mesh);
      const meshArray = await World.generate(600, 300, 50);


      const [x,y,z] = World.setInitialPosition();

      this.scene.camera.position.set(x,y,z);

      this.timeoutSync(500);
      meshArray.forEach((mesh, i) =>
        {
          if(i === 0) this.meshBulding = mesh;
          this.scene.scene.add(mesh)
        }
      );


      document.addEventListener(
        "keyup",
        this.controller.keyUp.bind(World)
      );
      document.addEventListener(
        "keydown",
        (event: KeyboardEvent) => {
          this.controller.keyDown.bind(this)(event, World, this.scene.controls);
        }
      );

      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true
      });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.animate();
      this.$root.$emit("canvas-loaded");
    },
    animate() {
      const time = performance.now();
      if(this.scene.controls.isLocked === true) {
        const delta = (time - World.prevTime) / 1000;
        console.log()
        if(
          this.scene.controls.getObject().position.z > 299.99 ||
          this.scene.controls.getObject().position.z < 0 ||
          this.scene.controls.getObject().position.x > 599.99 ||
          this.scene.controls.getObject().position.x < 0
        ) {
          this.safeExitWorld();
          return;
        }

        let posX = Math.floor(this.scene.controls.getObject().position.x);
        let posZ = Math.floor(this.scene.controls.getObject().position.z);
        let posY = World.globalCords[posX][posZ];

        World.direction.z = Number( World.moveForward ) - Number( World.moveBackward );
        World.direction.x = Number( World.moveRight ) - Number( World.moveLeft );

        //this.rayCaster.setFromCamera(World.mouse, this.scene.camera);
        //const intersections = this.rayCaster.intersectObject(this.meshArray[0]);
        //if(intersections.length > 0) {
          //console.log(intersections[0]);
          //const instanceId = intersections[0].instanceId;
          //if(instanceId) {
          //  console.log(this.meshArray[0].getColorAt(instanceId, this.color));
          //  console.log(this.color);
          //  //console.log(this.meshArray[0].getColorAt(instanceId, this.m))
          //}
          //if(instanceId) {
          //  //(this.meshArray[0] as InstancedMesh).getColorAt(instanceId, this.color);
          //  //if(this.color.equals(new THREE.Color().setHex(0x9AD533))){
          //    this.meshArray[0].setColorAt(instanceId, this.color);
          //    //@ts-ignore
          //    //this.meshArray[0].instanceColor.needsUpdate = true;
          //    //this.meshArray[0].matrixWorldNeedsUpdate = true;
          //
          //    if(this.meshArray[0].instanceColor) {
          //      //   console.warn(this.meshArray[0].);
          //      //console.log(this.meshArray[0].getColorAt(instanceId, this.ttColor))
          //    }
          //  //}
          //}
        //}

        if ( World.moveForward || World.moveBackward ) {
          World.velocity.z -= World.direction.z * 50.0 * delta;
        }
        if ( World.moveLeft || World.moveRight ) {
          World.velocity.x -= World.direction.x * 50.0 * delta;
        }

        if(
        this.scene.controls.getObject().position.x >= 0 &&
        this.scene.controls.getObject().position.z <= World.globalSize[1] &&
        this.scene.controls.getObject().position.z >= 0)
            {
              this.scene.controls.moveRight( - World.velocity.x * delta );
              this.scene.controls.moveForward( - World.velocity.z * delta );
              this.scene.controls.getObject().position.y = posY + 3;
              if(
                World.canJump
                //(this.scene.controls.getObject().position.y - (World.velocity.y * delta) + 1) > posY && World.canJump
                //(this.scene.controls.getObject().position.y - (World.velocity.y * delta) + 1) < (posY + 3)
              ) {
                console.log(World.velocity.y * delta + 1);
                //if((posY + (World.velocity.y * delta + 1)) < (posY + 2))
                this.scene.controls.getObject().position.y += World.velocity.y * delta + 1;
              }
              else {
                if((this.scene.controls.getObject().position.y - World.velocity.y * delta + 1) > (posY + 1))
                this.scene.controls.getObject().position.y -= World.velocity.y * delta + 1;
              }
            }
        World.velocity.x -= World.velocity.x * 5.0 * delta;
        World.velocity.z -= World.velocity.z * 5.0 * delta;

      }
      this.renderer.render(this.scene.scene, this.scene.camera);

      World.prevTime = time;

      requestAnimationFrame(this.animate);
    },
    async timeoutSync(time: number) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, time);
      });
    },
    safeExitWorld () {
      this.scene.controls.unlock();
      this.$root.$emit('safe-exit-world');
    },
    startConfigMenu () {
      console.log('a')
      this.showCover = false;
      this.showConfig = true;
    },
    hardRedirect(url: string) {
      window.location.href = "creative";
    }
  },
  beforeRouteLeave(to, from , next) {
    try {
      this.scene.controls.lock();
    } catch {}
    next();
  }
});
