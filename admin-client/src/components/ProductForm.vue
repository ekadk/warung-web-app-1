<script>
import Button from "./Button.vue";
export default {
  props: ["formTitle", "primaryButtonName", "categories", "formData"],
  emits: ["changePage", "submitForm"],
  data() {
    return {
      foodForm: {
        name: "",
        description: "",
        price: "",
        imgUrl: "",
        categoryId: "",
      },
    };
  },
  components: {
    Button,
  },
  methods: {
    changePage(destination) {
      this.$emit("changePage", destination);
    },
    submitForm() {
      this.$emit("submitForm", this.foodForm);
    },
  },

  created() {
    if (this.formData) {
      this.foodForm = {
          id: this.formData.id,
          name: this.formData.name,
          description: this.formData.description,
          price: this.formData.price,
          imgUrl: this.formData.imgUrl,
          categoryId: this.formData.Category.id,
        };
    }
  },
};
</script>

<template>
  <section class="mt-16">
    <h1 class="text-2xl font-bold text-center">
      {{ formTitle }}
    </h1>
    <div class="flex justify-center">
      <form
        action=""
        class="mt-4 px-10 py-10 max-w-lg shadow-lg"
        style="border: grey solid 0.5px"
        @submit.prevent="submitForm"
      >
        <div class="mb-4 flex-col">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="foodForm.name"
          />
        </div>

        <div class="mb-4 flex-col">
          <label for="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="foodForm.description"
          />
        </div>

        <div class="mb-4 flex-col">
          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="foodForm.price"
          />
        </div>

        <div class="mb-4 flex-col">
          <label for="imgUrl">Image URL</label>
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="foodForm.imgUrl"
          />
        </div>

        <div class="mb-4 flex-col">
          <label for="category">Category</label>
          <select
            name="category"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="foodForm.categoryId"
          >
            <option value="" selected disabled>-- Select Category --</option>
            <option v-for="category in categories" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div>
          <Button
            :type="'submit'"
            :buttonName="primaryButtonName"
            :buttonType="'primary'"
            @triggeredFunction="submitForm"
          />

          <Button
            :buttonName="'Cancel'"
            :buttonType="'secondary'"
            @triggeredFunction="changePage('ProductPage')"
          />
        </div>
      </form>
    </div>
  </section>
</template>
