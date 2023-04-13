import BaseCube from "./BaseCube";

class WoodenCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650820799";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "wooden_sltoyo.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded
    });
  }
}

export default WoodenCube;
