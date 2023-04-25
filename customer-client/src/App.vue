<script>
import Navbar from "./components/Navbar.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "./stores/main";

export default {
  components: {
    Navbar,
    Loading,
  },

  computed: {
    ...mapState(useMainStore, ['fullPage']),
    ...mapWritableState(useMainStore, ['isLoading'])
  },

  methods: {
    ...mapActions(useMainStore, ['loginHandler'])
  },

  async created() {
    try {
      await this.loginHandler()
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="fullPage"
    :color="'#D61E1E'"
    :loader="'bars'"
    :lock-scroll="true"
  />
  <Navbar />
  <div class="mx-32">
    <router-view />
  </div>
</template>
