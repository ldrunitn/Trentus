import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import App from "@/App.vue";
import userModule from "./modules/user/userModule";
import gdsModule from "./modules/gds/gdsModule";
import adminModule from "./modules/admin/adminModule";


export default createStore ({
    state() {
        return {
            role: ""
        }
    },
    modules: {
        user: userModule,
        gds: gdsModule,
        admin: adminModule
    },
    mutations,
    getters,
    actions,
})
