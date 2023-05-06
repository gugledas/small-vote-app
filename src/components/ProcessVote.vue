<template>
  <div class="form-vote">
    <transition name="slide-fade">
      <div key="vote-form" v-if="!isConnecting">
        <div>
          <h3 class="h2 sd-title">
            What is the best Nigerian company in Cameroon ?
          </h3>
        </div>
        <div class="choice-content">
          <form>
            <div
              class="option-list"
              :class="{
                'option-disabled': !canDoAction,
              }"
            >
              <div
                class="select-card"
                v-for="(choix, index) in choices"
                :key="index"
                :class="{
                  'select-card--selectued': isSelected(index),
                }"
                @click="selectOption(index)"
              >
                <img :src="choix.logo" alt="" />
                <div class="sc-label">{{ choix.label }}</div>

                <b-button
                  v-show="canDoAction"
                  class="btn-vote"
                  type="submit"
                  block
                  variant="primary"
                  @click="VoteNow($event, choix)"
                >
                  Voter
                </b-button>

                <div
                  class="result-effect"
                  :class="{
                    'result-effect--on': !canDoAction,
                  }"
                >
                  <div
                    class="pourcentage-bar"
                    :style="
                      'height:' + getPercentVote(choix.total_votes) + '%;'
                    "
                  ></div>
                  <span class="percent-value font-weight-bold mb-3">
                    {{ choix.total_votes }} vote(s)
                  </span>
                </div>
              </div>
            </div>
            <div class="votes text-light" v-show="!isConnecting">
              <h4>{{ totalVotes }} votes</h4>
              <p v-if="canDoAction" class="font-italic font-weight-light">
                Voter maintenant afin de determiner la repartition des voies.
              </p>
            </div>
            <hr class="p-2" />
          </form>
        </div>
      </div>
      <div key="login-form" class="form-login" v-if="isConnecting">
        <div class="form-login-container">
          <h5 class="sd-title text-center">Connexion</h5>
          <login-register
            actionAfterRegister="emit_even_register"
            action-after-login="emit_even"
            :showModalSuccess="false"
            ref="LoginRegister"
          ></login-register>
        </div>
      </div>
    </transition>
    <div>
      <div
        class="loading-cover"
        :class="{
          'loading-cover--on': isSaving,
        }"
      >
        <b-spinner class="align-middle spinner-centered text-light" />
      </div>
    </div>
  </div>
</template>

<script>
import loginRegister from "drupal-vuejs/src/App/components/LoginRegister.vue";
import users from "../config/users";
import { mapState, mapGetters } from "vuex";
export default {
  name: "ProcessVote",
  props: {},
  components: { loginRegister },
  data() {
    return {
      form: {
        user: null,
        selected: "",
      },
      isSaving: false,
      isConnecting: false,
    };
  },
  computed: {
    ...mapState({
      choices: (state) =>
        state.results.candidats ? state.results.candidats : [],
      form_connect: (state) => state.form,
      user_has_voted: (state) =>
        state.results.user_has_voted ? state.results.user_has_voted : false,
    }),
    ...mapGetters(["totalVotes"]),
    canDoAction() {
      return this.user_has_voted ? false : true;
    },
  },
  /**
   * --
   */
  mounted() {
    this.check_if_user_connected();
    this.check_if_user_register();
    this.getCurrentUser();
  },
  methods: {
    selectOption(index) {
      this.form.selected = index;
    },
    isSelected(index) {
      if (this.form.selected == index && this.canDoAction) return true;
    },
    VoteNow(ev, choix) {
      ev.preventDefault();
      this.$store.commit("SET_VOTE_SELECTED", choix);
      // si l'utilisateur est deja connecté
      if (this.form.user) {
        this.isConnecting = false;
        this.setVote();
      } else this.isConnecting = true;
    },
    check_if_user_connected() {
      document.addEventListener(
        "login_rx_vuejs__user_is_login",
        () => {
          this.getCurrentUser();
          // Si l'utilisateur s'est connecté, il a forcement cliquer sur vote
          this.setVote();
        },
        false
      );
    },
    check_if_user_register() {
      document.addEventListener(
        "login_rx_vuejs__user_is_register",
        () => {
          console.log("this.$refs : ", this.$refs);
          this.$refs.LoginRegister.connexionUser(this.form_connect);
        },
        false
      );
    },
    getCurrentUser() {
      users.getCurrentUser().then((user) => {
        this.form.user = user;
      });
    },
    /**
     * --
     */
    setVote() {
      this.isSaving = true;
      this.isConnecting = false;
      this.$store
        .dispatch("setVote")
        .then(() => {
          this.$store.dispatch("loadDatas");
          this.isSaving = false;
        })
        .catch((er) => {
          console.log("er", er);
        });
    },
    getPercentVote(number) {
      var percent = 0;
      number = parseInt(number);
      if (number && this.totalVotes) {
        percent = (number / this.totalVotes) * 100;
      }
      return percent;
    },
  },
};
</script>

<style lang="scss">
@use "@stephane888/wbu-atomique/scss/wbu-ressources-clean.scss" as *;
$first_color: #08c;
$second_color: #131d60;
.form-vote {
  text-align: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  .loading-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 99%;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s;
    &--on {
      opacity: 1;
      z-index: 3;
    }
  }

  .votes {
    padding: 10px 0;
  }
  .choice-content {
    .email {
      max-width: 300px;
      margin-top: 50px;
    }
    .thank-msg {
      letter-spacing: 2px;
      font-weight: bold;
    }
  }
  .option-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 20px;
  }
  .select-card {
    padding: 0 10px 0 10px 0;
    border-radius: 4px;
    background-color: rgba(#fff, 0.7);
    box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
    flex-basis: calc(50% - 14px);
    height: 220px;
    min-width: 140px;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border: 1px solid transparent;
    position: relative;
    //color: white;
    transition: ease 0.3s;
    //justify-content: flex-end;
    overflow: hidden;
    // &::before {
    //   content: "";
    //   width: 20px;
    //   height: 20px;
    //   border: 1px solid gray;
    //   position: absolute;
    //   top: 15px;
    //   left: 15px;
    //   opacity: 0;
    //   background: transparent;
    //   transition: 0.3s;
    // }
    .btn-vote {
      // position: absolute;
      bottom: -0px;
    }
    &:hover {
      border-color: rgba($first_color, 0.6);
      &::before {
        opacity: 1;
      }
    }
    img {
      //border: 1px solid rgba($first_color, 0.1);
      // padding: 10px;
      // margin: 0 0 2px 0;
      cursor: pointer;
      border-radius: 4px;
      width: auto;
      max-width: 100%;
      height: 110px;
      object-fit: contain;
      // position: absolute;
      // left: 0;
      // top: 8px;
      // transform: translateX(40%);
      // transform-origin: center;
    }
    .sc-label {
      margin-bottom: 20px;
    }
    &--selected {
      border: 2px solid rgba($first_color, 0.6);
      box-shadow: 0 0 8px rgba($first_color, 0.3);
      &::before {
        background: $first_color;
        opacity: 1;
      }
    }
  }
  .option-disabled {
    pointer-events: none;
  }
  .result-effect {
    display: flex;
    align-items: end;
    justify-content: center;
    position: absolute;
    inset: 0;
    height: 100%;
    transition: 0.3s;
    opacity: 0;
    z-index: -1;
    &::before {
      content: "";
      position: absolute;
      background: rgba($second_color, 50%);
      background: linear-gradient(
        180deg,
        rgba(254, 254, 254, 0.028448879551820738) 0%,
        rgba(95, 95, 99, 0.5578606442577031) 65%,
        rgba(46, 46, 46, 0.8211659663865546) 100%
      );
      opacity: 1;
      inset: 0;
      z-index: -1;
      top: 50%;
    }
    &--on {
      z-index: initial;
      opacity: 1;

      &::before {
        z-index: 2;
      }
    }
    .percent-value {
      z-index: 5;
      font-size: 20px;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.71);
    }
  }
  .pourcentage-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10%;
    z-index: 2;
    background: $first_color;
    opacity: 0.9;
    transition: height 1.2s;
  }
  .form-login {
    position: relative;
    width: 450px;
    height: 550px;
    margin: auto;
    position: relative;
    // .form-login-container {
    //   // position: absolute;
    //   // top: 0;
    //   // bottom: 0;
    //   // left: 0;
    //   // right: 0;
    // }
    .login-page {
      margin-left: auto;
      margin-right: auto;
      justify-content: flex-start;
      min-height: 0;
    }
    .politik-secur {
      display: none;
    }
  }
  @media only screen and (min-width: 569px) {
    .select-card {
      flex-basis: calc(50% - 14px);
      margin: 0;
    }
  }
  @media only screen and (min-width: 993px) {
    .select-card {
      flex-basis: calc(33% - 14px);
    }
  }
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  // transform: translateX(10px);
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
