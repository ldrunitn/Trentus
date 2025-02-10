import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async register({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/utente/registrazione', credentials)
        }
        catch (error) {
            throw new Error("Registrazione non riuscita");
            
        }
    },

    async login({commit,getters},credentials) {
        try{
            await axios.post(BACKEND_URL + '/utente/login', credentials)
            .then(response => {
                commit('setToken', response.data.token, {root: true});
                commit('setRole', "user", { root: true }); //imposto il ruolo globale
            })
            await this.dispatch('user/fetchFavourites');
        }
        catch (err) {
            throw new Error("Login non riuscito: ");
        }
    },
    async fetchFavourites({commit,rootGetters}){
        try{
            await axios.get(BACKEND_URL + '/utente/preferiti',{
                headers: {
                    authorization: rootGetters['getToken'],
                }
            }).then(response => {
                commit('setFavourites', response.data.preferiti)
            })  
        }
        catch(err){
            console.error("Errore nell'ottenere i preferiti " + err);
        }
    },
    async toggleFavourite({commit, getters, rootGetters},service_id){
        try{
            //usa l'api per il toggle
            await axios.post(BACKEND_URL + `/servizi/${service_id}/preferito`,{},{
                headers: {
                    authorization: rootGetters.getToken
                }
            })
            commit('toggleFromFavourites', service_id);
        }catch(err){
            console.error(err);
        }
    },
    async fetchServices({commit,getters}) {
        try {
            await axios.get(BACKEND_URL + '/servizi')
            .then(response => {
                commit('setServices', response.data);
            })
        } catch (error) {
            console.error(error)
        }
    },
    async fetchAlerts({commit,getters}){
        try {
            let alerts = {};

            let fav = getters.getFavourites;
            // Raccolgo tutte le richieste in un array
            const promises = fav.map(async id => {
                const response_service = await axios.get(BACKEND_URL + `/servizi/${id}`);

                const response = await axios.get(BACKEND_URL + `/servizi/${id}/avvisi`);
                alerts[response_service.data.titolo] = response.data;
            });

            // Aspetta che tutte le promesse siano risolte
            await Promise.all(promises);
            commit('setAlerts', alerts);
        } catch (error) {
            console.error(error);
            throw new Error("Impossibile trovare i servizi");
        }
    }
}