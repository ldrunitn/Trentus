import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async fetchRequests({commit,getters}){
        await axios.get(BACKEND_URL + '/controlpanel/confermagds/lista',{
            headers: {
                authorization: getters["getToken"],
            }
        }).then(response => {
            // console.log("-----------LOGIN---------------\n");
            // console.log(response.data.preferiti);
            commit('setRequests', response.data)
            console.log('REQUESTS ACTION FETCH REQUEST')
            console.log(response.data);
        })
    },
    async login({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/controlpanel/login', credentials)
            .then(response => {
                console.log(response.data);
                commit('setToken', response.data.token)
                commit('setToken', response.data.token, {root: true});
                commit('setRole', "admin", { root: true }); //imposto il ruolo globale
                console.log(getters.getIsAuthenticated);
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
            console.log(error)
        }
    },
    getRequest({commit,getters}, request_id){
        console.log("ACTION")
        console.log(getters.getRequests);
        return getters.getRequests.find(request => request._id === request_id);
    }
}