<script>
import Table from "./Table.vue";
export default {
  components: { Table },
  props: ["food"],
  emits: ["changePage", "getFoodById", 'updateFoodStatus'],
  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    getFoodById(id) {
      this.$emit("getFoodById", id);
    },
    updateFoodStatus(payload) {
      this.$emit('updateFoodStatus', payload)
    }
  },
};
</script>
<template>
  <section class="w-full px-8">
    <h1 class="font-bold text-4xl mt-8 mb-4 text-center">Products</h1>
    <div class="flex justify-end">
      <div class="mb-8">
        <a
          class="py-2 px-4 bg-black text-white flex gap-2 align-middle items-center"
          href=""
          style="border: grey solid 0.5px"
          @click.prevent="changePage('AddProductPage')"
        >
          <i class="fa-regular fa-square-plus"></i> Add Product</a
        >
      </div>
    </div>
    <div>
      <Table
        :data="food"
        actionButton="EditButton"
        @actionButtonEvent="getFoodById"
        @updateFoodStatus="updateFoodStatus"
      />
    </div>
  </section>
</template>
