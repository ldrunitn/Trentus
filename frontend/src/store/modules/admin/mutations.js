export default {
    setToken(state, token) {
        state.token = token;
        state.isAuthenticated = true;
    },
    setServices(state,services) {
        state.services = services;
    },
    logout(state) {
        state.token = "";
        state.isAuthenticated = false;
        state.services = [];
    },
    setRequests(state, payload){
        console.log("MUTATION PER DAVVERO")
        console.log(payload);
        state.requests = payload;
    }
}