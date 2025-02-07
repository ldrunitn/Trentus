import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    state: () => ({
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
        services: [],
        requests : [],
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}

