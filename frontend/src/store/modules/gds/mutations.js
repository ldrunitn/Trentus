export default {
    // setOptionsForm(state,newOptionsForm) {
    //     state.opzioniForm = newOptionsForm;
    // },
    setToken(state,newToken) {
        state.token = newToken;
        state.isAuthenticated = true;
    },
    setService(state,service) {
        state.service = service;
    },
    setServiceId(state, id){
        state.service_id = id;
    },
    logout(state) {
        state.token = '';
        state.titolo = '';
        state.azienda = '';
        state.url = '';
        state.picture = null;
        state.descrizione = '';
        state.opzioniForm = [];
        state.status = '';
        state.isAuthenticated = false;
    }
    

}