export const state = () => ({
  selected: 0,
  material: 0,
});

export const mutations = {
  select(state: any, payload: number) {
    state.selected = payload;
  },
  setmaterial(state: any, payload: number) {
    state.material = payload;
  }
};
