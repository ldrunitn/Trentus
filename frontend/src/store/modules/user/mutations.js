import { parseQuery } from "vue-router";
import userModule from "./userModule";
export default {
    setToken(state, token) {
        state.token = token;
        state.isAuthenticated = true;
    },
    setFavourites(state,favourites) {
        state.favourites = [...favourites]; //questa sintassi fa in modo che vue reagisca alla modifica
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