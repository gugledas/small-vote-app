<template>
  <div class="form-vote">
    <transition name="slide-fade">
      <div key="vote-form" v-if="!isConnecting">
        <div>
          <h3 class="h1 sd-title">
            Quel est la meilleur entreprise nigériane au cameroun ?
          </h3>
        </div>
        <div class="choice-content">
          <form>
            <div
              class="option-list"
              :class="{
                'option-disabled': !form.canDoAction,
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
                  v-show="form.canDoAction"
                  class="btn-vote"
                  type="submit"
                  block
                  variant="primary"
                  @click="submitForm"
                  >Voter</b-button
                >

                <div
                  class="result-effect"
                  :class="{
                    'result-effect--on': !form.canDoAction,
                  }"
                >
                  <div
                    class="pourcentage-bar"
                    :style="'height:' + choix.total_votes + '%;'"
                  ></div>
                  <span class="percent-value">{{ choix.total_votes }}%</span>
                </div>
              </div>
            </div>
            <div class="votes" v-show="!form.canDoAction">
              <b-badge variant="light" class="px-2 py-2">125 votes</b-badge>
            </div>
            <div v-show="!form.canDoAction">
              <!-- <b-button
                type="submit"
                block
                variant="dark"
                @click="submitForm"
                :disabled="!form.canDoAction"
                >Voter</b-button
              > -->
              <h3>Merci!</h3>
            </div>
            <hr class="p-2" />
          </form>
        </div>
      </div>
      <div key="login-form" class="form-login" v-if="isConnecting">
        <h5 class="sd-title text-left">Connexion</h5>
        <login-register></login-register>
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
    <!-- <b-button
      type="submit"
      block
      variant="dark"
      @click="submitVote"
      :disabled="!form.canDoAction"
      >...</b-button
    > -->
  </div>
</template>

<script>
import { loginRegister } from "drupal-vuejs";
import users from "../config/users";
export default {
  name: "ProcessVote",
  props: {},
  components: { loginRegister },
  data() {
    return {
      form: {
        user: null,
        selected: "",
        canDoAction: true,
      },
      isSaving: false,
      isConnecting: false,
      choices: [
        {
          logo: "https://cdn.vanguardngr.com/wp-content/uploads/2020/01/UBA-logo-2.gif",
          label: "UBA - United Bank of Africa",
          total_votes: 0,
        },
        {
          logo: "https://arda.africa/wp-content/uploads/2022/08/Arda_Member_Logos_MRS.png",
          label: "MRS",
          total_votes: 0,
        },
        {
          logo: "https://upload.wikimedia.org/wikipedia/fr/7/77/Dangote_Group_Logo..png",
          label: "DANGOTE CEMENT",
          total_votes: 0,
        },
        {
          logo: "https://www.processmaker.com/wp-content/uploads/2020/08/access-bank-logo.png",
          label: "ACCESS BANK",
          total_votes: 0,
        },
        {
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Unionbanklogo.png",
          label: "UNION BANK",
          total_votes: 0,
        },
      ],
    };
  },
  mounted() {
    this.check_if_user_connected();
    users.getCurrentUser().then((user) => {
      //console.log("user login--", user);
      if (user) {
        this.$store.dispatch("setConnected", {
          connected: true,
          already: true,
        });
      }
    });
  },
  computed: {},
  methods: {
    selectOption(index) {
      this.form.selected = index;
    },
    isSelected(index) {
      if (this.form.selected == index && this.form.canDoAction) return true;
    },
    submitForm(ev) {
      ev.preventDefault();
      // this.isSaving = true;
      console.log("submitForm");
      this.isConnecting = true;
      // this.form.canDoAction = false;
      // this.choices = [
      //   {
      //     logo: "https://cdn.vanguardngr.com/wp-content/uploads/2020/01/UBA-logo-2.gif",
      //     label: "UBA - United Bank of Africa",
      //     total_votes: 70,
      //   },
      //   {
      //     logo: "https://arda.africa/wp-content/uploads/2022/08/Arda_Member_Logos_MRS.png",
      //     label: "MRS",
      //     total_votes: 0,
      //   },
      //   {
      //     logo: "https://upload.wikimedia.org/wikipedia/fr/7/77/Dangote_Group_Logo..png",
      //     label: "DANGOTE CEMENT",
      //     total_votes: 20,
      //   },
      //   {
      //     logo: "https://www.processmaker.com/wp-content/uploads/2020/08/access-bank-logo.png",
      //     label: "ACCESS BANK",
      //     total_votes: 32,
      //   },
      //   {
      //     logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Unionbanklogo.png",
      //     label: "UNION BANK",
      //     total_votes: 10,
      //   },
      // ];
    },
    submitVote(ev) {
      ev.preventDefault();
      this.isConnecting = false;

      console.log("submitForm");
      setTimeout(() => {
        this.isSaving = true;
        setTimeout(() => {
          this.isSaving = false;
          this.choices = [
            {
              logo: "https://cdn.vanguardngr.com/wp-content/uploads/2020/01/UBA-logo-2.gif",
              label: "UBA - United Bank of Africa",
              total_votes: 70,
            },
            {
              logo: "https://arda.africa/wp-content/uploads/2022/08/Arda_Member_Logos_MRS.png",
              label: "MRS",
              total_votes: 0,
            },
            {
              logo: "https://upload.wikimedia.org/wikipedia/fr/7/77/Dangote_Group_Logo..png",
              label: "DANGOTE CEMENT",
              total_votes: 20,
            },
            {
              logo: "https://www.processmaker.com/wp-content/uploads/2020/08/access-bank-logo.png",
              label: "ACCESS BANK",
              total_votes: 32,
            },
            {
              logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Unionbanklogo.png",
              label: "UNION BANK",
              total_votes: 10,
            },
          ];
          this.form.canDoAction = false;
        }, 2000);
      }, 500);
    },
    check_if_user_connected() {
      console.log("user login");
      document.addEventListener(
        "login_rx_vuejs__user_is_login",
        () => {
          console.log("user login");
          users.getCurrentUser().then((user) => {
            console.log("user login--", user);
            // if (user) {
            // 	this.$store.dispatch("setConnected", {
            // 		connected: true,
            // 		already: false,
            // 	});
            // }
          });
        },
        false
      );
    },
  },
};
</script>

<style lang="scss">
$first_color: #08c;
$second_color: #131d60;
.form-vote {
  max-width: 700px;
  text-align: left;
  margin-bottom: 20px;
  position: relative;

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
    padding: 10px;
    //cursor: pointer;
    border-radius: 4px;
    background-color: white;
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
      padding: 10px;
      margin: 0 0 2px 0;
      cursor: pointer;
      border-radius: 4px;
      width: 100%;
      height: 100px;
      object-fit: contain;
    }
    .sc-label {
      //  margin-top: 10px;
      margin-bottom: 10px;
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
    align-items: center;
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
      background: $second_color;
      opacity: 0.6;
      inset: 0;
      z-index: -1;
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
    width: 100%;
    z-index: 2;
    background: $first_color;
    opacity: 0.9;
    transition: height 1.2s;
  }
  .form-login {
    .login-page {
      max-width: none;
      margin: 0;
      margin-top: -10px;
      justify-content: flex-start;
      min-height: none;
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
