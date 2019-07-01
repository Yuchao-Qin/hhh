const routeName = {
  state: {
    routeName:'home'
  },
  mutations: {
    set_routeName: (state, name) => {
      console.log(name)
      state.routeName = name.slice(0, 1).toLowerCase() +  name.slice(1);
    }
  }
}

export default routeName;