export default {
    setTitle(state,newTitle) {
        state.titolo = newTitle;
    },
    setCompany(state,newCompany) {
        state.azienda = newCompany;
    },
    setUrl(state,newUrl) {
        state.url = newUrl;
    },
    setPicture(state,newPicture) {
        state.picture = newPicture;
    },
    setDescription(state,newDescription) {
        state.descrizione = newDescription;
    },
    setOptionsForm(state,newOptionsForm) {
        state.opzioniForm = newOptionsForm;
    },
    setStatus(state,newStatus) {
        state.status = newStatus;
    },
    setToken(state,newToken) {
        state.token = newToken;
        state.isAuthenticated = true;
    },
    setService(state,service) {
        state.titolo = service.titolo;
        state.azienda = service.azienda;
        state.url = service.url;
        state.picture = service.picture;
        state.descrizione = service.descrizione;
        state.opzioniForm = service.opzioniForm;
        state.status = service.status;
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