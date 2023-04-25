<script>
export default {
  emits: ['register'],
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    };
  },

  methods: {
    register() {
      this.$emit('register', this.registerForm)
    }
  }
};
</script>
<template>
  <section class="mt-16">
    <h1 class="text-2xl font-bold text-center">Register</h1>
    <div class="flex justify-center">
      <form
        action=""
        class="mt-4 px-10 py-10 max-w-lg shadow-lg"
        style="border: grey solid 0.5px"
        @submit.prevent="register"
      >
        <div class="mb-4 flex-col">
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="registerForm.username"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="mb-5">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="registerForm.email"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="mb-5">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="registerForm.password"
          />
        </div>

        <div class="mb-4">
          <label for="phoneNumber" class="mb-5">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="registerForm.phoneNumber"
          />
        </div>

        <div class="mb-4">
          <label for="address" class="mb-5">Address:</label>
          <textarea
            class="border-2 w-full px-4 py-2"
            name="address"
            cols="30"
            rows="4"
            v-model="registerForm.address"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-black px-4 py-2 text-white mt-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
