<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores/main";

export default {
  computed: {
    ...mapState(useMainStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useMainStore, ['logout'])
  }
};
</script>
<template>
  <header class="sticky top-0 z-50 mb-8">
    <nav
      class="bg-white max-w-screen"
      style="border-bottom: solid black 0.75px"
    >
      <div class="py-6 flex gap-6 justify-between mx-32">
        <div class="flex items-center">
          <i class="fa-solid fa-bowl-rice text-2xl pr-2"></i>
          <div
            class="font-bold text-2xl text-center pr-4"
            style="border-right: solid black 0.75px"
          >
            Warung
          </div>
          <div class="text-center pl-4">Good Food, Good Mood</div>
        </div>

        <div class="flex gap-6">
          <div
            class="flex items-center pr-6"
          >
            <ul class="flex gap-6">
              <li>
                <router-link :to="{ name: 'home' }">
                  <div class="text-center">
                    <i class="fa-solid fa-utensils text-2xl"></i>
                    <p>Food</p>
                  </div>
                </router-link>
              </li>
              <li v-if="!isLogin">
                <router-link :to="{ name: 'login' }">
                  <div class="text-center">
                    <i class="fa-solid fa-right-to-bracket text-2xl"></i>
                    <p>Login</p>
                  </div>
                </router-link>
              </li>
              <li v-if="!isLogin">
                <router-link :to="{ name: 'register' }">
                  <div class="text-center">
                    <i class="fa-solid fa-user-plus text-2xl"></i>
                    <p>Register</p>
                  </div>
                </router-link>
              </li>
              <li v-if="isLogin">
                <router-link :to="{ name: 'favorites' }">
                  <div class="text-center">
                    <i class="fa-solid fa-heart text-2xl"></i>
                    <p>Favorites</p>
                  </div>
                </router-link>
              </li>
              <li v-if="isLogin">
                <a href="" @click.prevent="logout" >
                  <div class="text-center">
                    <i class="fa-solid fa-right-from-bracket text-2xl"></i>
                    <p>Logout</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
