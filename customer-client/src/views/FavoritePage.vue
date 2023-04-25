<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores/main";
import Card from "../components/Card.vue";

export default {
  components: { Card },
  computed: {
    ...mapState(useMainStore, ['favorites'])
  },
  methods: {
    ...mapActions(useMainStore, ['getFavorites', 'successToast'])
  },
  // async created() {
  //   try {
  //     await this.getFavorites()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

</script>
<template>
  <h1 class="text-2xl mb-4">Favorites</h1>
  <h2 v-if="(favorites.length === 0)">No Food in Favorites</h2>
  <div class="grid grid-cols-3 gap-8 mb-16">
    <Card v-for="(item, index) in favorites" :key="index" :menu="item.Food" :deleteId="item.id" />
  </div>
</template>
