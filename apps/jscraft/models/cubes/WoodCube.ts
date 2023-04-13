import BaseCube from "./BaseCube";

class WoodCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650820799";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "wood_zkyovj.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded
    });
  }

  test() {
    return this.generateSimple;
  }
}

export default WoodCube;
