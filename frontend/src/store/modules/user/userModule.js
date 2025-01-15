import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    state: () => ({
        services: [],
        favourites: [],
        alerts: {},
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
        
        
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}

