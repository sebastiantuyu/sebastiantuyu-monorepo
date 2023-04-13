export const state = () => ({
  config: {
    clouds: true,
    trees: true,
    grass: true,
    texturePack: "classic",
    renderObject: "house"
  }
});

export const mutations = {
  setclouds(state: any, newValue: any) {
    const isOn =  newValue === 'ON';
    state.config.clouds = isOn;
    localStorage.setItem('clouds', isOn.toString());
  },
  settrees(state: any, newValue: any) {
    state.config.trees = newValue === 'ON';
  },
  setgrass(state: any, newValue: any) {
    const isOn =  newValue === 'ON';
    state.config.grass = isOn;
    localStorage.setItem('grass', isOn.toString());
  },
  settexture(state: any, newValue: string) {
    if(['classic','softer'].some((e) => newValue.toLocaleLowerCase() === e))
      state.config.texturePack = newValue.toLocaleLowerCase();
      localStorage.setItem('texture', newValue.toLocaleLowerCase());
  },
  setrender(state: any, newValue: string) {
    if(['house','jungle temple'].some((e) => newValue.toLocaleLowerCase() === e))
      state.config.renderObject = newValue.toLocaleLowerCase();
      localStorage.setItem('render-object', newValue.toLocaleLowerCase());
  }
}
