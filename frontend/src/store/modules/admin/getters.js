export default {
    getServices(state) {
        return state.services;
    },
    getToken(state) {
        return state.token;
    },
    getIsAuthenticated(state) {
        return state.isAuthenticated;
    },
    getService(state,id) {
        return state.services.find(service => service._id === id); 
    },
    getRequests(state){
        console.log("GETTER")
        return state.requests;
    }
}