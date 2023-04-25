<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
export default {
  props: ['menu', 'deleteId'],
  computed: {
    ...mapState(useMainStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useMainStore, ['postFavorites', 'deleteFavorite']),
  }
}
</script>
<template>
  <div class="border-2 p-4 shadow-lg">
    <h3 class="text-xl font-bold mb-3">{{ menu.name }}</h3>
    <div
      :src="menu.imgUrl"
      class="bg-center bg-cover mb-4"
      :style="{ backgroundImage: `url(${menu.imgUrl})`, height: '200px' }"
    ></div>
    <div class="mb-2 gap-2 flex">
      <p class="font-bold">Category:</p>
      {{ menu.Category.name }}
    </div>
    <div class="mb-2 gap-2 flex">
      <p class="font-bold">Price:</p>
      {{ menu.price }}
    </div>
    <div>
      <p class="font-bold mb-1">Description:</p>
      <p class="truncate mb-6">{{ menu.description }}</p>
    </div>
    <div
      class="flex justify-between gap-4 pt-2"
      style="border-top: solid black 0.75px"
    >
    <!-- Action Buttons -->
      <a href=""
        class="flex items-center gap-2"
        v-if="(!menu.inFavorite && this.$route.name === 'home')"
        @click.prevent="(!isLogin) ? this.$router.push({ name: 'login' }) : postFavorites(menu.id)" >
        <i class="fa-regular fa-heart text-2xl"></i>
        Add to Favorite
      </a>

      <a href="" class="flex items-center gap-2" v-if="(menu.inFavorite && this.$route.name === 'favorites')" @click.prevent="deleteFavorite(deleteId)" >
        <i class="fa-sharp fa-solid fa-xmark text-2xl text-red-500"></i>
        Remove from Favorite
      </a>

      <router-link :to="{ name: 'details', params: { id: menu.id }}" class="flex items-center gap-2">
        <i class="fa-solid fa-circle-info text-2xl"></i>
        Details
      </router-link>
    </div>
  </div>
</template>
