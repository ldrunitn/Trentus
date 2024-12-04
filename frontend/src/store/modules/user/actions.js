import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async login({commit,getters},credentials) {
        try{
            let alerts;
            await axios.post(BACKEND_URL + '/utente/login', credentials)
            .then(response => {
                commit('setToken', response.data.token)
            })
            await axios.get(BACKEND_URL + 'utente/preferiti',{
                headers: {
                    authorization: getters.getToken(),
                }
            }).then(response => {
                commit('setFavourites', response.data)
            })

            getters.getFavourites().forEach(serviceId => {
                const titolo = getters.getService(serviceId).titolo;
                alerts[titolo] = [];
                axios.get(BACKEND_URL + `/servizi/${serviceId}/avvisi`, credentials)
                .then(response => {
                    alerts[titolo].push(response.data);
                })
            });
            commit('setAlerts', alerts);
        }
        catch (error) {
            console.log(error)
        }
    },
    async fetchServices({commit,getters}) {
        try {
            await axios.get(BACKEND_URL + '/servizi')
            .then(response => {
                console.log(response.data);
                commit('setServices', response.data);
            })
        } catch (error) {
            console.log(error)
        }
    }
}