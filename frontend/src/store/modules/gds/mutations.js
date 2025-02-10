export default {
    // setOptionsForm(state,newOptionsForm) {
    //     state.opzioniForm = newOptionsForm;
    // },
    setService(state,service) {
        state.service = service;
    },
    setServiceId(state, id){
        state.service_id = id;
    },
    logout(state) {
        state.service = {};
        state.service_id = "";
    }
    

}