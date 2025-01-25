export default {
    setToken(state, token) {
        state.token = token;
        state.isAuthenticated = true;
    },
    setFavourites(state,favourites) {
        state.favourites = favourites;
    },
    setServices(state,services) {
        state.services = services;
    },
    addAlerts(state, payload){
        state.alerts[payload["service_id"]] = payload["alerts"];
    },
    setAlerts(state, payload){
        state.alerts = payload;
    },
    setCurrentAlert(state, payload){
        state.currentAlert = payload;
    },
    logout(state) {
        state.token = "";
        state.isAuthenticated = false;
        state.favourites = [];
        state.alerts = {};
    }
}