import { parseQuery } from "vue-router";
import userModule from "./userModule";
export default {
    setFavourites(state,favourites) {
        state.favourites =favourites; 
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
        state.favourites = [];
        state.alerts = {};
        state.showFavourites = false;
    },
    toggleShowFavourites(state){
        state.showFavourites = !state.showFavourites; 
    },
    toggleFromFavourites(state, service_id){
        if(state.favourites.includes(service_id))
            state.favourites = state.favourites.filter(id => id != service_id)
        else state.favourites.push(service_id);
    }
}