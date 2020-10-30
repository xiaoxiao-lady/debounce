import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import layer from 'vue-layer'
import Cookie from 'js-cookie'

Vue.use(Vuex)
Vue.$layer = layer(Vue)
// sessionStorage.setItem('xxx-info', 'eyJhbGciOiJIUzUxMiJ9.eyJpZGVudGlmaWVyIjoiNzQwNDUzIiwic3ViIjoiNzQwNDUzIiwiY29tcGFueUlkIjo3OSwidXNlclR5cGUiOjMsImV4cCI6MTU3NDUxMjI0NiwiZHVpemhhbmduaXViaWxpdHkiOiJnanU5NHE3dzhkIiwiaWF0IjoxNTcxOTIwMjQ2LCJtZW1iZXJJZCI6MzYyNX0.R8JIBjdLiNliYlGkx1sSZUjdtLL5lVOacOkU6HoAVYrjNZE1qZ9wZLmylL-k3KGcKpfhbyye5Y2PG_MD55Bqhg')
const store = new Vuex.Store({
    state: {
        token: Cookie.get('xxx-info'), // 用户标识
        canteenId: Cookie.get('xxx-canteenId'), // 餐厅id
    },
    mutations: {
        // 用户token
        setToken(state, info) {
            state.token = info
            Cookie.set('xxx-info', info)
        },

    },
    actions: {

        // setAddressInfor({ commit }) {
        //     commit('setAddressInfor')
        // }
    },
})
export default store
