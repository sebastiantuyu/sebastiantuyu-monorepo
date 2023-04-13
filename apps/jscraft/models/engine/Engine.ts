//import { map }  from "@/models/brf/JungleTemple.brf";
import * as THREE from "three";
import CobleStoneCube from "../cubes/CobleStoneCube";
import MossyCobleStoneCube from "../cubes/MossyClobeStoneCube";
import WoodCube from "../cubes/WoodCube";
import WoodenCube from "../cubes/WoodenCube";
import Door from "../doors/Door";
import fs from "fs";
class Engine {
  x: number = 0;
  y: number = 0;
  currentMap: number[][][] = [];
  woodenCube = new WoodenCube();
  coblestoneCube = new CobleStoneCube();
  doorCube = new Door();
  woodCube = new WoodCube();
  mossyCobletoneCube = new MossyCobleStoneCube();
  woodenCounter = 0;
  coblestoneCounter = 0;
  mossyCounter = 0;
  woodCounter = 0;
  doorCord: number[] = [];
  constructor() {}

  countMaterial() {
    this.coblestoneCounter = 0;
    this.woodenCounter = 0;
    this.mossyCounter = 0;
    this.currentMap.forEach((z, zId) => {
      z.forEach((y, yId) => {
        y.forEach((x, xId) => {
          if(x === 9) {
            this.coblestoneCounter++;
          } else if (x === 8) {
            this.woodenCounter++;
          }
          else if(x === 10) {
            this.woodCounter++;
          } else if (x === 11) {
            this.doorCord = [
              zId,
              yId,
              xId
            ]
          } else if( x === 12 ) {
            this.mossyCounter++;
            this.coblestoneCounter++;
          }
        })
      })
    })
  }

  async fetchSyncFile() {
    let url = 'https://res.cloudinary.com/dwd2eaext/raw/upload/v1653973505/portfolio/brf/';
    const titleName = [
      "House.brf_rqr5oy.json",
      "JungleTemple.brf_iren8w.json"
    ]

    if(localStorage.getItem('render-object')) {
      switch(localStorage.getItem('render-object')) {
        case 'house':
          url += titleName[0];
          break;
        case 'jungle temple':
          url += titleName[1];
          break;
        default:
          url += titleName[0];
          break;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async build(xStart: number, yStart: number, zStart: number, globalCords: number[][]) {
    const { map } = await this.fetchSyncFile();
    console.log(map);
    this.currentMap = map;
    this.countMaterial();
    let woodenId = 0;
    let mossyId = 0;
    let woodId = 0;
    let doorId = 0;
    let coblestoneId = 0;
    await Promise.all([
      this.woodenCube.load(),
      this.coblestoneCube.load(),
      this.woodCube.load(),
      this.doorCube.load(),
      this.mossyCobletoneCube.load()
    ]);

    const iWoodenMesh = this.woodenCube.renderInstacedMesh(this.woodenCounter*1.5);
    const iCoblestoneMesh = this.coblestoneCube.renderInstacedMesh(this.coblestoneCounter*3);
    const iWoodMesh = this.woodCube.renderInstacedMesh(this.woodCounter);
    const iDoorMesh = this.doorCube.renderInstacedMesh(2);
    const iMossyCMesh = this.mossyCobletoneCube.renderInstacedMesh(this.mossyCounter*1.5);

    this.currentMap.forEach((z,zId) => {
      z.forEach((y,yId) => {
        y.forEach((x,xId) => {
          let tMat = new THREE.Matrix4().makeTranslation(
            xStart + xId,
            zStart + zId,
            yStart + yId,
          );

          if(x === 9) {
            iWoodenMesh.setMatrixAt(woodenId, tMat);
            woodenId++;
          } else if(x === 8) {
            iCoblestoneMesh.setMatrixAt(coblestoneId, tMat);
            coblestoneId++;
          } else if (x === 10) {
            iWoodMesh.setMatrixAt(woodId, tMat);
            woodId++;
          } else if (x === 11) {
            tMat = new THREE.Matrix4().makeTranslation(
              xStart + xId,
              zStart + zId + 0.5,
              yStart + yId,
            );
            iDoorMesh.setMatrixAt(doorId, tMat);
            doorId++;
          } else if (x === 12) {
            let choice_ = Math.floor(Math.random() * 3);
            if(choice_ === 1) {
              iCoblestoneMesh.setMatrixAt(coblestoneId, tMat);
              coblestoneId++;
            } else {
              iMossyCMesh.setMatrixAt(mossyId, tMat);
              mossyId++;
            }
          }

            if(globalCords[xStart + xId][yStart + yId] < (zStart + zId) && zId === 0)
            {

              let h = (zStart + zId) - globalCords[xStart + xId][yStart + yId];
              for(let i=0;i<(h);i++){
                if(globalCords[xStart + xId][yStart + yId] + i < (zStart + zId + 1)) {
                  tMat = new THREE.Matrix4().makeTranslation(
                    xStart + xId,
                    globalCords[xStart + xId][yStart + yId] + i,
                    yStart + yId,
                  )

                  iMossyCMesh.setMatrixAt(mossyId, tMat);
                  mossyId++;
                }
              }
            }
        })
      })
    });

    return [
      iWoodenMesh,
      iMossyCMesh,
      iWoodMesh,
      iDoorMesh,
      iCoblestoneMesh
    ]
  }

  rotate(matrix: number[][]) {          // function statement
    const N = matrix.length - 1;   // use a constant
    // use arrow functions and nested map;
    const result = matrix.map((row, i) =>
         row.map((val, j) => matrix[N - j][i])
    );
    matrix.length = 0;       // hold original array reference
    matrix.push(...result);  // Spread operator
    return matrix;
  }
}

export default new Engine();
