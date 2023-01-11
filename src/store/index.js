import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    voteSelected: null,
    user: {
      totalVote: 0,
      connected: false,
      startConnection: false,
    },
    result: {},
  },
  getters: {},
  mutations: {
    SET_CURRENT_USER() {},
  },
  actions: {
    setCurrentUser() {},
  },
  modules: {},
});
/* étape 1 le visiteur vote une en/se on recupère l'en/se stoke dans voteSelected
 * étape 2 le visiteur doit se connecter et lorsque c'est fais il revient sur le précédent composant sur isSaving
 * pour
 */
