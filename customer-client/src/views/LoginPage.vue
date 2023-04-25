<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMainStore } from '../stores/main'
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useMainStore, ['login', 'googleSignIn']),
    GoogleCallback(response) {
      this.googleSignIn(response)
    }
  },
  computed: {
    ...mapWritableState(useMainStore, ['isLoading'])
  },

  created() {
    this.isLoading = false
  }
}
</script>
<template>
  <section class="mt-16">
    <h1 class="text-2xl font-bold text-center">Login</h1>
    <div class="flex justify-center">
      <form
        action=""
        class="mt-4 px-10 py-10 max-w-lg shadow-lg"
        style="border: grey solid 0.5px"
        @submit.prevent="login(loginForm)"
      >
        <div class="mb-4">
          <label for="email" class="mb-5">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            class="border-2 w-full px-4 py-2"
            v-model="loginForm.email"
          />
        </div>
        <div class="gap-4 items-center mb-4">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="border-2 w-full px-4 py-2"
            v-model="loginForm.password"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-black px-4 py-2 text-white mt-4"
          >
            Login
          </button>
        </div>
        <div class="w-full items-center mt-4">
          <GoogleLogin :callback="GoogleCallback" class="w-full"/>
        </div>
      </form>
    </div>
  </section>
</template>
