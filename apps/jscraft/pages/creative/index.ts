/* eslint-disable no-undef */
import Vue from "vue";
import * as THREE from "three";
import BaseScene from "~/models/Scene";
import { World } from "~/models/World";
import Controller from "~/models/Controller";
import Loader from "~/components/loader/Loader";
import Inventory from "~/components/inventory/Inventory";
import Instructions from "~/components/instructions/Instructions";
import DeadScreen from "~/components/deadScreen/DeadScreen";
import { GlobalEventEmitter } from "~/utils/GlobalEmitter";
import ConfigurationMenu from "~/components/configurationMenu/ConfigurationMenu";
import SocketRoom from "~/components/socketRoom/SocketRoom";

// @ts-ignore
import info from "~/package.json";

const version = info.version;

interface IData {
  position: number[];
  type: number;
  action: "add" | "remove";
}

interface IUserState {
  username: string;
  action: "joined" | "left";
}

export default Vue.extend({
  components: {
    Loader,
    Inventory,
    Instructions,
    DeadScreen,
    ConfigurationMenu,
    SocketRoom
  },
  data() {
    return {
      showCover: true,
      isLoading: true,
      scene: {} as BaseScene,
      camera: null as any,
      mesh: null as any,
      renderer: null as any,
      controller: {} as Controller,
      version: version,
      isDead: false,
      username: "",
      loaderMessage: "",
      modelsAvailables: [] as string[],
      texturePacksAvailables: [] as string[],
      meshBuilding: [] as any[],
      lockedLayer: "",
      socket: {} as any,
      isConnected: false,
    };
  },
  head() {
    return {
      title: "JavaScraft | Creative"
    }
  },
  computed: {
    isMobile(): boolean {
      return window.innerWidth <= 720;
    },
    isUsernameValid(): boolean {
      return this.username.length > 3;
    }
  },
  created() {
    this.$root.$on("canvas-loaded", () => {
      this.isLoading = false;
      this.username = localStorage.getItem("username") || "";
      this.socket.emit('username', this.username);
    });
    this.$root.$on("safe-exit-world", () => this.isDead = true);

    GlobalEventEmitter.$on("loader-status-msg", (msg: string) => {
      this.loaderMessage = msg;
    });
  },
  async mounted() {
    console.info("Connecting with socket...");
    const response = await (await fetch(
      process.env.NODE_ENV === "production" ?
      "https://socket.sebastiantuyu.com/" :
      "https://socket.sebastiantuyu.com/delay-check/10000"
      , {
      method: "GET",
    })).json();

    if (response.message === "ok") {
      this.isConnected = true;
      console.info("Connected with socket!");
    }

    this.socket = (this as any).$nuxtSocket({
      name: 'chatroom',
      channel: '/',
      teardown: false
    });

    this.socket.on('user-state', (data: IUserState) => {
      this.$root.$emit("socket-message", {
        user: data.username,
        message: `${data.action} the room`
      });
    });

    this.socket.on('s-set-element', async (data: IData) => {
      if(data.action === "add") {
        const cubeToExtrude: any = this.materialSelector(data.type);
        await cubeToExtrude.load();
        this.mesh = cubeToExtrude.generateSimple();
        this.mesh.position.set(data.position[0], data.position[1], data.position[2]);
        this.scene.add(this.mesh);
      } else {

      }
    });
  },
  beforeDestroy() {
    this.$root.$off("canvas-loaded");
    document.removeEventListener('mousedown', (event) => {});
    document.removeEventListener('mouseup', (event) => {});
    this.socket.emit('c-disconnect', this.username);
    this.socket.disconnect();
  },
  methods: {
    startDemo() {
      this.showCover = false;
      GlobalEventEmitter.$emit("loader-status-msg", 'Building world...');
      setTimeout(() => this.buildWorld(), 1000);
      //document.getElementsByTagName('body')[0].requestFullscreen();
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

      await this.timeoutSync(100);



      localStorage.setItem('world-size-x', '100');
      localStorage.setItem('world-size-z', '100');
      localStorage.setItem('world-size-y', '2');
      const meshArray = [(await World.generate(100, 100, 2, true))[0]];

      const [x,y,z] = World.setInitialPosition();

      this.scene.camera.position.set(x,y,z);

      this.timeoutSync(100);
      meshArray.forEach((mesh, i) =>
        {
          if(i === 0) {
            this.lockedLayer = mesh.uuid;
          }
          this.meshBuilding.push(mesh);
          this.scene.scene.add(mesh);
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

      document.addEventListener('mousedown', async (event) => {
        event.preventDefault();

        if(World && this.meshBuilding.length !== 0 && event.which === 1) {
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(World.mouse, this.scene.camera);
          const intersects = raycaster.intersectObjects(this.scene.scene.children);
          if (intersects.length > 0) {
            if(true) {
              const cubeToExtrude: any = this.materialSelector();
              await cubeToExtrude.load();
              this.mesh = cubeToExtrude.generateSimple();
              let cD = new THREE.Vector3(0, 0, 0);
              this.meshBuilding[0].getMatrixAt(intersects[0].instanceId, cD);
              try {
                const current = new THREE.Matrix4();
                const pos = new THREE.Vector3();
                this.meshBuilding[0].getMatrixAt(intersects[0].instanceId, current);
                pos.setFromMatrixPosition(current);
                this.mesh.position.x = pos.x;
                this.mesh.position.y = pos.y;
                this.mesh.position.z = pos.z;
                if(intersects[0].face?.normal.y === 1) {
                  this.mesh.position.y = pos.y + 1;
                }
                this.scene.add(this.mesh);
                World.globalCords[pos.x][pos.z] = pos.y;
                this.socket.emit('set-element', {
                  position: [pos.x, pos.y + 1, pos.z],
                  type: this.$store.state.creative.material,
                  action: "add"
                });
              } catch {
                let {x,y,z} = intersects[0].object.position
                this.mesh.position.x = x;
                this.mesh.position.y = y;
                this.mesh.position.z = z;
                if(intersects[0].face?.normal.x === -1) {
                  this.mesh.position.x = x - 1;
                  x--;
                } else if (intersects[0].face?.normal.y === 1) {
                  this.mesh.position.y = y + 1;
                  y++;
                } else if (intersects[0].face?.normal.x === 1) {
                  this.mesh.position.x = x + 1;
                  x++;
                } else if(intersects[0].face?.normal.z === 1) {
                  this.mesh.position.z = z + 1;
                  z++;
                } else if(intersects[0].face?.normal.z === -1) {
                  this.mesh.position.z = z - 1;
                  z--;
                } else if(intersects[0].face?.normal.y === -1) {
                  this.mesh.position.y = y - 1;
                  y--;
                }

                this.scene.add(this.mesh);
                World.globalCords[x][z] = y;
                this.socket.emit('set-element', {
                  position: [x, y, z],
                  type: this.$store.state.creative.material,
                  action: "add"
                });
              }
            }
          }

        } else if (event.which === 3) {
          if(World && this.meshBuilding.length !== 0) {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(World.mouse, this.scene.camera);
            const intersects = raycaster.intersectObjects(this.scene.scene.children);
            if(intersects.length > 0 && intersects[0].object.uuid !== this.lockedLayer) {
              this.scene.scene.remove(intersects[0].object);
            }
          }
        }
      });

      document.addEventListener('wheel', (e) => {
        this.$root.$emit('change-inventory-element', e.deltaY);
      });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.animate();
      this.$root.$emit("canvas-loaded");
    },
    animate() {
      const time = performance.now();
      if(this.scene.controls.isLocked === true) {
        if(this.mesh) {
          this.mesh.matrixWorldNeedsUpdate = true;
        }

        if(this.meshBuilding[0].instanceColor !== null) {
          this.meshBuilding[0].instanceColor.needsUpdate = true;
        }
        const delta = (time - World.prevTime) / 1000;
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
    selectObject () {
      this.$store.commit('creative/select', 1);
    },
    materialSelector(type?: number) {
      switch(type ?? this.$store.state.creative.material) {
        case 0:
          return World.grassCube;
        case 1:
          return World.dirtCube;
        case 2:
          return World.sandCube
        case 3:
          return World.stoneCube;
        case 4:
          return World.woodCube;
      }
    }
  },
  beforeRouteLeave(to, from , next) {
    try {
      this.scene.controls.lock();
    } catch {}
    next();
  }
});
