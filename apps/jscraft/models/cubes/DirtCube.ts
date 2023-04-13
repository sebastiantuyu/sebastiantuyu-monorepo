import BaseCube from "./BaseCube";

class DirtCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    const textLoaded = await this.loader
      .loadAsync(this.baseURI + "dirt_wxriqe.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded
    });
  }
}

export default DirtCube;
