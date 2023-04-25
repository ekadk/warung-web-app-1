<script>
import ProductForm from "./ProductForm.vue";
export default {
  data() {
    return {
      formTitle: "Add Product",
      primaryButtonName: "",
    };
  },
  props: ["categories"],
  emits: ["changePage", "addFood"],
  components: {
    ProductForm,
  },
  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    addFood(foodForm) {
      this.$emit('addFood', foodForm)
    }
  },
};
</script>

<template>
  <ProductForm
    :formTitle="formTitle"
    :primaryButtonName="'Add Product'"
    :categories="categories"
    @changePage="changePage"
    @submitForm="addFood"
  />
</template>
