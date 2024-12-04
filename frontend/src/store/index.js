import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import App from "@/App.vue";
import userModule from "./modules/user/userModule";
import gdsModule from "./modules/gds/gdsModule";


export default createStore ({
    state() {
        return {
            token: "",
            email: "",
            
        }
    },
    modules: {
        user: userModule,
        gds: gdsModule,
    },
    mutations,
    getters,
    actions,
})
