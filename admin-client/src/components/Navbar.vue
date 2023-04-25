<script>
  export default {
    emits: ['changePage'],
    methods: {
      changePage(destination) {
        this.$emit('changePage', destination)
      }
    }
  }
</script>
<template>
  <header class="sticky top-0 z-50">
    <nav class="bg-white shadow-lg w-screen px-32">
      <div class="py-4 flex gap-8">
        <div class="flex justify-center items-center gap-2">
          <div class="text-3xl"><i class="fa-solid fa-bowl-rice"></i></div>
          <div>
            <div class="font-bold text-xl">Warung</div>
            <div class="text-xs">Admin Panel</div>
          </div>
        </div>
        <div class="flex items-center">
          <ul class="flex gap-8">
            <li>
              <a
              href=""
              @click.prevent="changePage('RegisterPage')"
              class="flex gap-1 items-center"
              >
                <i class="fa-solid fa-address-card"></i>
                <span>Register</span></a
              >
            </li>
            <li>
              <a
              href=""
              @click.prevent="changePage('LoginPage')"
              class="flex gap-1 items-center"
              >
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Login</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
