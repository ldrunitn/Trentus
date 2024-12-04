import userModule from "./userModule";
export default {
    setToken(state, token) {
        state.token = token;
        state.isAuthenticated = true;
    },
    setAlerts(state,alerts) {
        state.alerts = alerts;
    },
    setFavourites(state,favourites) {
        state.favourites = favourites;
    },
    setServices(state,services) {
        state.services = services;
    },
    logout(state) {
        state.token = "";
        state.isAuthenticated = false;
        state.favourites = [];
        state.alerts = [];
    }
}