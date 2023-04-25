<script>
export default {
  emits: ["changePage", "logout"],
  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    logout() {
      this.$emit('logout')
    }
  },
};
</script>
<template>
  <nav
    class="col-span-1 flex-col pl-8 text-lg bg-white w-60 sticky h-screen top-0 p-8"
    style="border-right: grey solid 0.5px"
  >
    <div class="text-3xl"><i class="fa-solid fa-bowl-rice"></i></div>
    <div class="mb-8">
      <div class="font-bold text-xl">Warung</div>
      <div class="text-xs">Admin Panel</div>
    </div>
    <div class="">
      <a
        href=""
        class="flex items-center gap-3 text-lg mb-2"
        @click.prevent="changePage('DashboardPage')"
        ><i class="fa-solid fa-chart-line"></i> Dashboard</a
      >
      <a
        href=""
        class="flex items-center gap-3 text-lg mb-2"
        @click.prevent="changePage('ProductPage')"
        ><i class="fa-solid fa-bowl-food"></i>Product</a
      >
      <a
        href=""
        class="flex items-center gap-3 text-lg mb-2"
        @click.prevent="changePage('CategoryPage')"
      >
        <i class="fa-solid fa-rectangle-list"></i> Category</a
      >
    </div>
    <div class="mt-6 pt-4" style="border-top: grey solid 0.5px">
      <a href="" class="flex items-center gap-3 text-lg mb-2" @click.prevent="logout">
        <i class="fa-solid fa-right-from-bracket"></i>Logout</a
      >
    </div>
  </nav>
</template>
