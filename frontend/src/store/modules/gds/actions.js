import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async login({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/gds/login', credentials)
            .then(response => {
                console.log(response.data);
                commit('setToken', response.data.token)
                commit('setToken', response.data.token, {root: true});
                commit('setRole', "gds", { root: true }); //imposto il ruolo globale
                console.log(getters.getIsAuthenticated);
            })
            await axios.get(BACKEND_URL + '/gds/servizio/',{
                headers: {
                    authorization: getters.getToken,
                }
            }).then(response => {
                commit('setServiceId', response.data["servizio_id"]);
                console.log(response.data["servizio_id"]);
            })
        }
        catch (error) {
            throw new Error("Login non riuscito");
        }
    },

    logout({commit}) {
        localStorage.removeItem('token');
        commit('logout');
    }
}