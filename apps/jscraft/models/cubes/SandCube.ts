import BaseCube from "./BaseCube";

class SandCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    const textLoaded = await this.loader
      .loadAsync(this.baseURI + "sand_v2_ey3c9g.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded
    });
  }
}

export default SandCube;
