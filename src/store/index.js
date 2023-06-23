import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
    details: [],
    services: [],
    categories: [],
    card: {}
  },
  getters: {
  },
  mutations: {
    SET_DETAILS(state, info) {
      state.details = info;
    },
    SET_SERV(state, info) {
      state.services = info;
    },
    SET_CAT(state, info) {
      state.categories = info;
    },
    SET_CARD(state, info) {
      state.card = info;
    },

  },
  actions: {
    fetchDetails({ commit }, selected) {
      axios.get('https://tbm-nonprod.dvb.corpinter.net/fetchDetails/' + selected)
        .then(response => {
          if(response.data == null){
            commit("SET_DETAILS", []);
          }
          else{
            commit("SET_DETAILS", response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchServices({ commit }, vin) {
      axios.get('https://tbm-nonprod.dvb.corpinter.net/fetchAllDetails/' + vin)
        .then(response => {
          console.log()
          commit("SET_SERV", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchCategories({ commit }) {
      axios.get('https://tbm-nonprod.dvb.corpinter.net/fetchDetails')
        .then(response => {
          commit("SET_CAT", response.data.categories);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  modules: {
  }
})
