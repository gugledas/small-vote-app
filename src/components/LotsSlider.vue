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
        img-alt="Nikamex Écrans plats"
        :img-src="lot.image"
        :caption-htmli="formatCaption(lot.text)"
        caption-tag="div"
      ></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <!-- <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide> -->

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <!-- <b-carousel-slide
        caption="Blank Image Bro"
        img-blank
        img-alt="Blank image"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
          pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide> -->
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "LotsSlider",
  props: {},
  data() {
    return {
      slide: 0,
      sliding: null,
      allLots: [
        {
          image:
            "https://content.fun-japan.jp/renewal-prod/cms/articles/content/cccdc2edaf2aa2d8304f2bf3326d495f32c76353.jpg",
          text: "Des écrans plat à gagner",
        },
        // {
        //   image: "https://picsum.photos/1024/780/?image=53",
        //   text: "10 Motos",
        // },
        // {
        //   image: "https://picsum.photos/1024/780/?image=35",
        //   text: "Un billet d'avion",
        // },
        // {
        //   image: "https://picsum.photos/1024/780/?image=5",
        //   text: "Un séjour au Nigéria",
        // },
      ],
    };
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
