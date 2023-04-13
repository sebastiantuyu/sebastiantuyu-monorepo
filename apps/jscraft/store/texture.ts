export const state = () => ({
  texturePackage: ''
});

export const mutations = {
  set(state: any, payload: string) {
    state.texturePackage = payload;
  }
}
