import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
    details: [],
    services: [],
    categories: []
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
  },
  actions: {
    fetchDetails({ commit }, selected) {

      axios.get('https://tbm-nonprod.dvb.corpinter.net/fetchDetails/Gen20x')
        .then(response => {
          console.log(response.data);
          commit("SET_DETAILS", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async fetchServices({ commit }) {
      try {
        const data = await axios.get(
          "http://localhost:3000/W1K2140041Z900026"
        );
        commit("SET_SERV", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const data = await axios.get(
          "http://localhost:3000/categories"
        );
        commit("SET_CAT", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {
  }
})
