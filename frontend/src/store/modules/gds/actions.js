import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async login({commit,getters, rootGetters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/gds/login', credentials)
            .then(response => {
                commit('setToken', response.data.token, {root: true});
                commit('setRole', "gds", { root: true }); //imposto il ruolo globale
            })
            await axios.get(BACKEND_URL + '/gds/servizio/',{
                headers: {
                    authorization: rootGetters.getToken,
                }
            }).then(response => {
                commit('setServiceId', response.data["servizio_id"]);
            })
        }
        catch (error) {
            throw new Error("Login non riuscito");
        }
    },

    logout({commit}) {
        commit('logout');
    }
}