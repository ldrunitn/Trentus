import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    state: () => ({
        services: [],
        favourites: [],
        alerts: {},
        currentAlert: {},
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
        showFavourites: false, //true quando il filtro dei preferiti è attivato
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}

