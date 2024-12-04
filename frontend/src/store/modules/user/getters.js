export default {
    getServices(state) {
        return state.services;
    },
    getFilteredServices(state) {
        return state.services.filter(service => service.show);
    },
    getAlerts(state) {
        return state.alerts;
    },
    getFavourites(state) {
        return state.services.filter(service => state.favourites.includes(service._id));
    },
    getToken(state) {
        return state.token;
    },
    getIsAuthenticated(state) {
        return state.isAuthenticated;
    },
    getService(state,id) {
        return state.services.find(service => service._id === id); 
    }
}