const routeName = {
  state: {
    routeName:'home'
  },
  mutations: {
    set_routeName: (state, name) => {
      const nameTostring = name.toString()
      state.routeName = nameTostring.slice(0, 1).toLowerCase() +  nameTostring.slice(1);
    }
  }
}

export default routeName;