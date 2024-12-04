import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";



export default {
    state: () => ({
        titolo: "",
        azienda: "",
        url: "",
        picture: File,
        descrizione: "",
        opzioniForm: [], //capiamo!
        status: "",
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}