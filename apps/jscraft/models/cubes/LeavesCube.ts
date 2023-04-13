import BaseCube from "./BaseCube";

class LeavesCube extends BaseCube {
  constructor() {
    super();
  }

  async load() {
    this.v = "1650821011";
    this.texturePack = localStorage.getItem('texture') || '';
    const textLoaded = await this.loader
      .loadAsync(this.baseURI_() + "leaves_sjrbgr.png");
    this.texture = new this.three.MeshLambertMaterial({
      map: textLoaded,
      //color: 0x568438
    });
  }

  test() {
    return this.generateSimple;
  }
}

export default LeavesCube;
