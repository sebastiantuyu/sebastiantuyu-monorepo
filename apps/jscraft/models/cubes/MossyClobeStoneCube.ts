import BaseCube from "./BaseCube";

class MossyCobleStoneCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650821058";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "mossy_coblestone_e4tczq.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded,

    });
  }
}

export default MossyCobleStoneCube;

