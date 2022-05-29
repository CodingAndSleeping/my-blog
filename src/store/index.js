import user from '@/store/user';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex)
export default new Vuex.Store({
    // 配置user模块
    modules:{
        user
    }
}) 