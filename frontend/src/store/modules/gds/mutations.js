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
        state.service = {};
        state.service_id = "";
        state.token = "";
        state.isAuthenticated = "";
    }
    

}