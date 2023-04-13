import Vue from "vue";
import Vuex from "vuex";
import request from "../rootConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //to login
    form: {
      name: [{ value: "" }],
      mail: [{ value: "" }],
    },
    currentUser: null,
    voteSelected: null,
    user: {
      totalVote: 0,
      connected: false,
      startConnection: false,
    },
    // Contient les données provenant du serveur.
    results: {},
    /**
     * Configuration requise par le module login.
     */
    configs_login_rx_vuejs: {},
    model_register_form: null,
  },
  getters: {
    totalVotes(state) {
      var nbre = 0;
      if (state.results.candidats)
        state.results.candidats.forEach((candidat) => {
          nbre += parseInt(candidat.total_votes);
        });
      return nbre;
    },
  },
  mutations: {
    SET_CURRENT_USER() {},
    SET_RESULTS(state, payload) {
      state.results = payload;
    },
    SET_VOTE_SELECTED(state, payload) {
      state.voteSelected = payload;
    },
  },
  actions: {
    setCurrentUser() {},
    loadDatas({ commit }) {
      request
        .bGet("/candidat-vote/datas")
        .then((resp) => {
          commit("SET_RESULTS", resp.data);
        })
        .catch((er) => {
          console.log(" error : ", er);
        });
    },
    setVote({ commit, state }) {
      return request
        .bPost("/candidat-vote/set-vote", state.voteSelected)
        .then((resp) => {
          commit("SET_CURRENT_USER", resp.data);
        })
        .catch((er) => {
          console.log(" error : ", er);
        });
    },
  },
  modules: {},
});
/** Etape 1 le visiteur vote une en/se on recupère l'en/se stoke dans voteSelected
 * étape 2 le visiteur doit se connecter et lorsque c'est fais il revient sur le précédent composant sur isSaving
 * pour
 */
