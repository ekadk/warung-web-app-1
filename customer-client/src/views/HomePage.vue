<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useMainStore } from "../stores/main";
import Card from "../components/Card.vue";
import Pagination from '../components/Pagination.vue'

export default {
  components: { Card, Pagination},
  computed: {
    ...mapState(useMainStore, ["food"]),
    ...mapWritableState(useMainStore, ['filter', 'isLoading'])
  },
  methods: {
    ...mapActions(useMainStore, ['getAllFood', 'resetFilter', 'filterFood']),
    async resetFood() {
      try {
        this.isLoading = true
        this.resetFilter()
        await this.getAllFood()
        this.isLoading = false
      } catch (error) {
        console.log(error);
      }
    }
  },

  async created() {
    try {
      this.isLoading = true
      await this.getAllFood()
      this.isLoading = false
    } catch (error) {
      console.log(error);
    }
  },

  unmounted() {
      this.resetFilter()
  }
};
</script> 
<template>
  <div class="mb-32">
    <h1 class="text-2xl mb-6">Home Page</h1>
    <!-- Filter Form -->
    <form @submit.prevent="filterFood">
      <div class="grid grid-cols-4 mb-10 gap-8 px-8 pt-6 pb-8 border-2 shadow-md">
        <div>
          <p class="mb-3 font-bold">By Name:</p>
          <input type="text" v-model="filter.search" placeholder="Search by Name" class="border-2 w-full py-1 px-4">
        </div>
        <div>
          <p class="mb-3 font-bold">Minimum price:</p>
          <input type="number" v-model="filter.minPrice" placeholder="Search by Name" class="border-2 w-full py-1 px-4">
        </div>
        <div>
          <p class="mb-3 font-bold">Maximum price:</p>
          <input type="number" v-model="filter.maxPrice" placeholder="Search by Name" class="border-2 w-full py-1 px-4">
        </div>
        <div class="flex items-end gap-4">
            <button type="submit" class="border-2 w-full py-1 px-4 bg-black text-white">Search</button>
            <button class="border-2 w-full py-1 px-4" @click.prevent="resetFood">Reset</button>
        </div>
      </div>

    </form>

    <div class="grid grid-cols-3 gap-8 mb-16">
      <Card v-for="menu in food" :key="menu.id" :menu="menu" />
    </div>

    <Pagination />
  </div>
</template>
