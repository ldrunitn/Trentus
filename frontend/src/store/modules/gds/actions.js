import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async fetchService() {
        try  {
            axios.get(BACKEND_URL)
        } catch (error) {
            
        }
    },

    login({commit,getters}, credentials) {
        try{
            let serviceId;
            axios.post(BACKEND_URL + '/gds/login', credentials)
            .then(response => {
                commit('setToken', response.data.token)
            })
            axios.get(BACKEND_URL + '/gds/servizio', {
                    headers: {
                        authorization: getters.getToken()
                    }
                }
            ).then(response => {
                serviceId = response.data.id
            })
            axios.get(BACKEND_URL + '/gds/servizio/' + serviceId)
            .then(response => {
                commit('setService', response.data)
            })
        }
        catch (error) {
            console.log(error)
        }
    },

    logout({commit}) {
        localStorage.removeItem('token');
        commit('logout');
    }
}