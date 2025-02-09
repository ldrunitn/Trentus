export default {
    setRole(state, role){
      state.role = role;
    },
    setToken(state, token){
      state.token = token;
    },
    logout(state){
      this.commit('user/logout');
      this.commit('gds/logout');
      this.commit('admin/logout');
      state.role = "";
      state.token = "";
    }
}