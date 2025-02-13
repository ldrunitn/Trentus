import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


export default {
    state: () => ({
        services: [],
        requests : [],
    }),
    namespaced: true,
    mutations,
    actions,
    getters,
}

