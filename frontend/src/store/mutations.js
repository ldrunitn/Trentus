export default {
    setRole(state, role){
      state.role = role;
    },
    logout(state){
      switch(state.role){
        case "user":
          this.commit('user/logout');
          break;
        case "gds":
          this.commit('gds/logout');
        case "admin":
          this.commit('admin/logout');
      }
      state.role = "";
    }
}