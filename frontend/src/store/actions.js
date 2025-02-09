import Cookies from "js-cookie";

export default {
  logout({commit}){
    commit('user/logout');
    commit('gds/logout');
    commit('admin/logout');
    commit('resetState');
    Cookies.remove('vuex');
  }
}