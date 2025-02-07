export default {
    setRole(state, role){
      state.role = role;
    },
    setToken(state, token){
      state.token = token;
    },
    logout(state){
      switch(state.role){
        case "user":
          this.commit('user/logout');
          break;
        case "gds":
          this.commit('gds/logout');
          break;
        case "admin":
          this.commit('admin/logout');
          break;
      }
      state.role = "";
      state.token = "";
    }
}