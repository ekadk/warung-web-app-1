<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores/main";
export default {
  computed: {
    ...mapState(useMainStore, ["foodById", 'qrCode', 'isLogin']),
    ...mapWritableState(useMainStore, ['isLoading'])
  },

  methods: {
    ...mapActions(useMainStore, ["getFoodById", 'getQrCode', 'postFavorites', 'stopLoading']),
  },
};
</script>
<template>
  <div class="grid grid-cols-2 gap-8 mt-12 px-9" v-if="(!this.isLoading)">
    <div
      class="bg-center bg-cover mb-4"
      :style="{ backgroundImage: `url(${foodById.imgUrl})`, height: '500px' }"
    ></div>
    <div class="">
      <h1 class="text-3xl font-bold mb-4">{{ foodById.name }}</h1>
      <h3 class="text-xl mb-2">Category: {{ foodById.Category.name }}</h3>
      <h3 class="text-xl mb-4">Price: {{ foodById.price }}</h3>
      <p class="text-xl mb-12">{{ foodById.description }}</p>
      <div>
          <img style="height: 200px;" :src="qrCode.qrcode" alt="">
          <a href=""
        class="flex items-center gap-2"
        v-if="(!foodById.inFavorite)"
        @click.prevent="(!isLogin) ? this.$router.push({ name: 'login' }) : postFavorites(foodById.id)" >
        <i class="fa-regular fa-heart text-2xl"></i>
        Add to Favorite
      </a>
      </div>
    </div>
  </div>
</template>
