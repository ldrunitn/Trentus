import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async fetchRequests({commit,getters}){
        await axios.get(BACKEND_URL + '/controlpanel/confermagds/lista',{
            headers: {
                authorization: getters["getToken"],
            }
        }).then(response => {
            commit('setRequests', response.data)
        })
    },
    async login({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/controlpanel/login', credentials)
            .then(response => {
                commit('setToken', response.data.token)
                commit('setToken', response.data.token, {root: true});
                commit('setRole', "admin", { root: true }); //imposto il ruolo globale
            })
            await this.dispatch('admin/fetchServices');
            await this.dispatch('admin/fetchRequests');
        }
        catch (error) {
            throw new Error("Login non riuscito");
        }
    },
    async fetchServices({commit,getters}) {
        try {
            await axios.get(BACKEND_URL + '/servizi')
            .then(response => {
                commit('setServices', response.data);
            })
        } catch (error) {
            console.error("Errore nel fetch dei servizi")
        }
    },
    getRequest({commit,getters}, request_id){
        return getters.getRequests.find(request => request._id === request_id);
    }
}