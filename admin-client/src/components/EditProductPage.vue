<script>
import ProductForm from "./ProductForm.vue";
export default {
  data() {
    return {
      formTitle: "Edit Product",
      primaryButtonName: "Update",
    };
  },
  props: ["categories", "foodById"],
  emits: ["changePage", "updateFood"],
  components: {
    ProductForm,
  },
  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    updateFood(foodForm) {
      this.$emit('updateFood', foodForm)
    }
  },
};
</script>

<template>
  <ProductForm
    :formTitle="formTitle"
    :primaryButtonName="primaryButtonName"
    :categories="categories"
    :formData="foodById"
    @changePage="changePage"
    @submitForm="updateFood"
  />
</template>
