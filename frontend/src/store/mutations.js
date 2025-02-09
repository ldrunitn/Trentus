export default {
    setRole(state, role){
      state.role = role;
    },
    setToken(state, token){
      state.token = token;
    },
    resetState(state){
      state.role = "";
      state.token = "";
    }
}