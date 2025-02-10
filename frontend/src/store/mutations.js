export default {
    setRole(state, role){
      state.role = role;
    },
    setToken(state, token){
      state.token = token;
      state.isAuthenticated = true;
    },
    resetState(state){
      state.role = "";
      state.token = "";
      state.isAuthenticated = false;
    }
}