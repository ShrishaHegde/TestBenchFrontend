import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
    headunits : [
      {
        name: "Gen20X",
        showCards : false
      },
      {
        name: "NTG",
        showCards : false
      }
    ],
    gen20x: [],
    ntg: []
  },
  getters: {
  },
  mutations: {
    SET_GEN20X(state, info) {
      state.gen20x = info;
    },
    SET_NTG(state, info) {
      state.ntg = info;
    },
  },
  actions: {
    async fetchGen20x({ commit }) {
      try {
        const data = await axios.get(
          "http://localhost:3000/gen20x"
        );
        commit("SET_GEN20X", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchNtg({ commit }) {
      try {
        const data = await axios.get(
          "http://localhost:3000/ntg"
        );
        commit("SET_NTG", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {
  }
})
