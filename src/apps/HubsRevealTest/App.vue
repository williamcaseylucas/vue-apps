<template>
  <div ref="root" id="top">
    <div ref="reveal" class="reveal">
      <div class="slides">
        <section>Single Horizontal Slide 1</section>
        <section>Single Horizontal Slide 2</section>
        <section>Single Horizontal Slide 3</section>
      </div>
    </div>

  </div>
</template>

<script>
import Reveal from 'reveal.js/dist/reveal.esm'
import { ref, onMounted } from 'vue'

export default {
//   components: {
//     // HelloWorld
//   },
  
  setup() {
    const root = ref(null)
    const reveal = ref(null)

    var deck = ref(null)

    onMounted(() => {
        deck.value = new Reveal(reveal.value, {
            width: 400,
            height: 300,

            controls: true,
            controlsTutorial: false,
            progress: true,
            hash: false,
            respondToHashChanges: false,
            history: false,
            keyboard: false,
            keyboardConditional: "focused",
            overview: false,
            fragments: false,
            fragmentInURL: false,
            embedded: true,
            help: false,
            pause: false,
            showNotes: false,
            previewLinks: false,
            postMessage: false,
            focusBodyOnPageVisibilityChange: false,
            transition: 'none',
            backgroundTransition: 'none',
            viewDistance: 2,
            mobileViewDistance: 1
        })
        deck.value.initialize();
    })

    return {
        root, reveal, deck
    }
  }
}
</script>

<style scoped>
#top {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50312c;
  margin-top: 30px;
  border: 5;
  border-radius: 10px;
  border-color: red;
  width: 400px; height: 300px;
  position: absolute;

  display: block;
  background-color: white;
}


* {
    box-sizing: content-box;
}
img {
    max-width: none;
        display: inline;
}
</style>
