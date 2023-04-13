import BaseCube from "./BaseCube";
class GrassCube extends BaseCube {
  constructor() {
    super();
  }


  async load() {
    this.v = "1650820799";
    this.texturePack = localStorage.getItem('texture') || '';
    const sideTexture = await this.loader
    .loadAsync(this.baseURI_() + "grass__side_ittaq5.png");
    const topTexture = await this.loader
    .loadAsync(this.baseURI_() + "grass_top_dsxpf7.png");

    this.texture = [
      new this.three.MeshStandardMaterial({
        map: sideTexture,
        roughness: 1,
        metalness: 0
      }),
      new this.three.MeshStandardMaterial({ map: sideTexture,
        roughness: 1,
        metalness: 0
      }),
      new this.three.MeshStandardMaterial({ map: topTexture,
        roughness: 1,
        metalness: 0
      }),
      new this.three.MeshStandardMaterial({ map: topTexture,
        roughness: 1,
        metalness: 0
       }),
      new this.three.MeshStandardMaterial({ map: sideTexture,
        roughness: 1,
        metalness: 0
       }),
      new this.three.MeshStandardMaterial({ map: sideTexture,
        roughness: 1,
        metalness: 0
       }),
    ];
  }
}

export default GrassCube;
