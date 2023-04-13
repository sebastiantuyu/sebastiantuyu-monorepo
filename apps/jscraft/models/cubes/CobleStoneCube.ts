import BaseCube from "./BaseCube";

class CobleStoneCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650821058";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "coblestone_v4_np6b1y.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded,
      //color: 0x797979
    });
  }
}

export default CobleStoneCube;
//
