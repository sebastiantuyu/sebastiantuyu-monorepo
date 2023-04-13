import BaseCube from "./BaseCube";

class CloudCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.texture = new this.three.MeshLambertMaterial({
      color: '#ffffff'
    });
  }
}

export default CloudCube;
