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
                commit('setRole', "user", { root: true }); //imposto il ruolo globale
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
            let alerts = {};

            let fav = getters.getFavourites;
            // Raccolgo tutte le richieste in un array
            const promises = fav.map(async id => {
                const response_service = await axios.get(BACKEND_URL + `/servizi/${id}`);

                console.log(response_service.data);

                const response = await axios.get(BACKEND_URL + `/servizi/${id}/avvisi`);
                console.log(`Avvisi per il servizio ${id}:`, response.data);
                alerts[response_service.data.titolo] = response.data;
            });

            // Aspetta che tutte le promesse siano risolte
            await Promise.all(promises);
            commit('setAlerts', alerts);
            
            // console.log("---------ALERTS NELL'ACTION-----------");
            // console.log(JSON.stringify(getters.getAlerts));
            // console.log("STAMPA ALERT SINGOLO");
            // console.log(getters.getAlerts["674ef57eebb1aca78e9fb775"][0]["titolo"]);

        } catch (error) {
            console.error(error);
            throw new Error("Impossibile trovare i servizi");
        }
    }
}