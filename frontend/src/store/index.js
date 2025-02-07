import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import App from "@/App.vue";
import userModule from "./modules/user/userModule";
import gdsModule from "./modules/gds/gdsModule";
import adminModule from "./modules/admin/adminModule";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";


export default createStore ({
    state() {
        return {
            role: ""
        }
    },
    modules: {
        user: userModule,
        gds: gdsModule,
        admin: adminModule,
        token: ""
    },
    mutations,
    getters,
    actions,
    plugins: [
        createPersistedState({
            getState: (key) => {
                const cookie = Cookies.get(key);
                return cookie ? JSON.parse(cookie) : undefined;
            },
            setState: (key, state) => {
              Cookies.set(key, JSON.stringify(state), {
                secure: process.env.NODE_ENV === "production"
               });
            },
        })
    ]
})
