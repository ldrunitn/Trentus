export default {
    setServices(state,services) {
        state.services = services;
    },
    logout(state) {
        state.services = [];
    },
    setRequests(state, payload){
        state.requests = payload;
    }
}