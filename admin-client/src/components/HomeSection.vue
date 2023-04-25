<script>
import DashboardPage from "./DashboardPage.vue";
import CategoryForm from "./CategoryForm.vue";
import CategoryPage from "./CategoryPage.vue";
import Sidebar from "./Sidebar.vue";
import ProductPage from "./ProductPage.vue";
import AddProductPage from "./AddProductPage.vue";
import EditProductPage from "./EditProductPage.vue";

export default {
  components: {
    DashboardPage,
    CategoryForm,
    CategoryPage,
    Sidebar,
    ProductPage,
    AddProductPage,
    EditProductPage,
  },

  props: [
    "page",
    "food",
    "activeFood",
    "inactiveFood",
    "categories",
    "logs",
    "foodById",
  ],

  emits: [
    "changePage",
    "fetchAllFood",
    "fetchAllCategories",
    "fetchLogs",
    "addFood",
    "postCategory",
    "getFoodById",
    "deleteCategory",
    "updateFood",
    "updateFoodStatus",
    "logout",
  ],

  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    fetchAllFood() {
      this.$emit("fetchAllFood");
    },
    fetchAllCategories() {
      this.$emit("fetchAllCategories");
    },
    fetchLogs() {
      this.$emit("fetchLogs");
    },
    addFood(data) {
      this.$emit("addFood", data);
    },
    postCategory(data) {
      this.$emit("postCategory", data);
    },
    getFoodById(id) {
      this.$emit("getFoodById", id);
    },
    deleteCategory(id) {
      this.$emit("deleteCategory", id);
    },
    addFood(foodForm) {
      this.$emit("addFood", foodForm);
    },
    updateFood(foodForm) {
      this.$emit("updateFood", foodForm);
    },
    updateFoodStatus(payload) {
      this.$emit("updateFoodStatus", payload);
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
<template>
  <main class="container mx-auto">
    <section class="flex">
      <Sidebar @changePage="changePage" @logout="logout" />

      <section class="w-full">
        <DashboardPage
          v-if="page === 'DashboardPage'"
          :food="food"
          :activeFood="activeFood"
          :inactiveFood="inactiveFood"
          :categories="categories"
          :logs="logs"
        />
        <CategoryPage
          v-if="page === 'CategoryPage'"
          :categories="categories"
          @changePage="changePage"
          @deleteCategory="deleteCategory"
        />
        <ProductPage
          v-if="page === 'ProductPage'"
          :food="food"
          @changePage="changePage"
          @getFoodById="getFoodById"
          @updateFoodStatus="updateFoodStatus"
        />

        <AddProductPage
          v-if="page === 'AddProductPage'"
          :categories="categories"
          @addFood="addFood"
          @changePage="changePage"
        />

        <EditProductPage
          v-if="page === 'EditProductPage'"
          :categories="categories"
          :foodById="foodById"
          @changePage="changePage"
          @updateFood="updateFood"
        />

        <CategoryForm
          v-if="page === 'CategoryForm'"
          @changePage="changePage"
          @postCategory="postCategory"
        />
      </section>
    </section>
  </main>
</template>
