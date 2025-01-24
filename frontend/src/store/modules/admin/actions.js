import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
    async fetchRequests(){
        await axios.get(BACKEND_URL + '/utente/preferiti',{
            headers: {
                authorization: this.$state["user/getToken"],
            }
        }).then(response => {
            // console.log("-----------LOGIN---------------\n");
            // console.log(response.data.preferiti);
            commit('setFavourites', response.data.preferiti)
        })
    }
}