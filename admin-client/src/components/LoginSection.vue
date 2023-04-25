<script>
import Navbar from "./Navbar.vue";
import LoginPage from "./LoginPage.vue";
import RegisterPage from "./RegisterPage.vue";

export default {
  props: ["page"],
  emits: ["login", "register", "changePage", "GoogleLoginCallback"],

  components: {
    Navbar,
    LoginPage,
    RegisterPage,
  },

  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },

    login(data) {
      this.$emit("login", data);
    },

    register(data) {
      this.$emit("register", data);
    },

    GoogleLoginCallback(response) {
      this.$emit('GoogleLoginCallback', response)
    }
  },
};
</script>

<template>
  <Navbar @changePage="changePage" />
  <LoginPage v-if="page === 'LoginPage'" @login="login" @GoogleLoginCallback="GoogleLoginCallback" />
  <RegisterPage v-if="page === 'RegisterPage'" @register="register" />
</template>
