import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async register({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/utente/registrazione', credentials)
            .then(response => {
                console.log(response.data);
            })
        }
        catch (error) {
            throw new Error("Registrazione non riuscita");
            
        }
    },

    async login({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/utente/login', credentials)
            .then(response => {
                console.log(response.data);
                commit('setToken', response.data.token)
                console.log(getters.getIsAuthenticated);
            })
            await axios.get(BACKEND_URL + '/utente/preferiti',{
                headers: {
                    authorization: getters.getToken,
                }
            }).then(response => {
                // console.log("-----------LOGIN---------------\n");
                // console.log(response.data.preferiti);
                commit('setFavourites', response.data.preferiti)
            })
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
    async fetchAlerts({commit,getters}){
        try {
            const fav = getters.getFavourites;
            console.log(fav);
            fav.forEach(async id => {
                await axios.get(BACKEND_URL + `/servizi/${id}/avvisi`)
                .then(response => {
                    console.log(response.data);
                    // Non mette correttamente dentro alerts
                    commit('addAlerts', {
                        service_id: id,
                        alerts: response.data,
                    });
                })
            });
            console.log("ALERTS-----------");
            console.log(getters.getAlerts);
        } catch (error) {
            console.error(error);
            throw new Error("Impossibile trovare i servizi");
        }
    }
}