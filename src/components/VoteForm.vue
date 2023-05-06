<template>
  <div class="vote-section-form">
    <div class="vote-section">
      <!--  -->
    </div>
    <div class="container-fluid vsf-content">
      <b-row class="justify-content-between">
        <b-col
          md="12"
          lg="6"
          class="pl-00 mb-5 pb-5 mb-lg-0 pb-lg-0 block-vote"
        >
          <div class="section-desc">
            <h4 class="sd-title h3 font-weight-light">
              Vote for the best Nigerian company in Cameroon and try to win many
              prizes.
            </h4>
            <div class="list-lots">
              <lots-slider></lots-slider>
            </div>
          </div>
        </b-col>
        <b-col md="12" lg="6" class="ml-auto">
          <process-vote></process-vote>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import LotsSlider from "./LotsSlider.vue";
import ProcessVote from "./ProcessVote.vue";
export default {
  name: "VoteForm",
  components: { ProcessVote, LotsSlider },
  props: {
    msg: String,
  },
  mounted() {
    this.$store.dispatch("loadDatas");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@use "@stephane888/wbu-atomique/scss/wbu-ressources-clean.scss" as *;
.block-vote {
  display: flex;
  align-items: center;
}
.vote-section-form {
  // background-image: url("https://img.freepik.com/premium-vector/award-ceremony-background-with-golden-shapes-light-rays-abstract-luxury-background_156943-1508.jpg?w=2000");
  // background-repeat: no-repeat;
  // background-size: cover;
  min-height: 400px;
  //position: relative;
  //padding: 2rem 0 4rem 0;
  // &::before {
  //   content: "";
  //   inset: 0;
  //   position: absolute;
  //   background-color: black;
  //   opacity: 0.7;
  // }
  .vsf-content {
    padding-top: 50px;
  }
}
.vote-section-form .sd-title {
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
  max-width: 600px;
  line-height: 1.2;
}
.section-desc {
  max-width: 600px;
  margin: auto;
  @include media-min(DD) {
    padding: 0 4rem;
  }
}
.single-lot {
  .sl-lot {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  }
  img {
    max-width: 100%;
  }
}
</style>
