import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";



export default {
    state: () => ({
        service: {},
        service_id: "",
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}