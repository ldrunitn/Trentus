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
    getFavouritesServices(state) {//array con servizi preferiti
        return state.services.filter(service => state.favourites.includes(service._id));
    },
    getFavourites: (state) => state.favourites, 
    getToken(state) {
        return state.token;
    },
    getIsAuthenticated(state) {
        return state.isAuthenticated;
    },
    getService(state,id) {
        return state.services.find(service => service._id === id); 
    },
    getCurrentAlert(state,id) {
        return state.currentAlert;
    },
    getShowFavourites(state){
        return state.showFavourites;
    }
}