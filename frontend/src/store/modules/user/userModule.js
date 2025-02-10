import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    state: () => ({
        services: [],
        favourites: [],
        alerts: {},
        currentAlert: {},
        showFavourites: false, //true quando il filtro dei preferiti è attivato
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}

