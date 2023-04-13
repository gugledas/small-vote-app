<template>
  <div class="lots-slide">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#292020"
      img-width="1024"
      img-height="650"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="(lot, index) in allLots"
        :key="index"
        img-alt=""
        :img-src="lot.image"
        :caption-html="formatCaption(lot.text)"
        caption-tag="div"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LotsSlider",
  props: {},
  data() {
    return {
      slide: 0,
      sliding: null,
      // allLots: [
      //   {
      //     image:
      //       "https://content.fun-japan.jp/renewal-prod/cms/articles/content/cccdc2edaf2aa2d8304f2bf3326d495f32c76353.jpg",
      //     text: "Des écrans plat à gagner",
      //   },
      //   {
      //     image:
      //       "https://content.fun-japan.jp/renewal-prod/cms/articles/content/cccdc2edaf2aa2d8304f2bf3326d495f32c76353.jpg",
      //     text: "Des écrans plat à gagner",
      //   },
      // ],
    };
  },
  computed: {
    ...mapState({
      allLots: (state) => (state.results.lots ? state.results.lots : []),
    }),
  },
  mounted() {
    //
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    formatCaption(text) {
      return `<h6 class="slide-caption"> ${text} </h6>`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.lots-slide {
  // .carousel-caption {
  //   padding: 10px;
  //   border-radius: 5px;
  //   background: rgba(black, 0.2);
  // }
}
</style>
