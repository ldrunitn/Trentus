export default {
    getServices(state) {
        return state.services;
    },
    getService(state,id) {
        return state.services.find(service => service._id === id); 
    },
    getRequests(state){
        return state.requests;
    }
}