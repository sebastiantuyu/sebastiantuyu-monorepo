import BaseCube from "./BaseCube";

class StoneCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    const textLoaded = await this.loader
      .loadAsync(this.baseURI + "stone_zpl24t.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded
    });
  }
}

export default StoneCube;
