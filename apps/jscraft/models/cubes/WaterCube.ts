import BaseCube from "./BaseCube";

class WaterCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650821179";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "water_b3ui7b.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded,
    });
  }

  test() {
    return this.generateSimple;
  }
}

export default WaterCube;
