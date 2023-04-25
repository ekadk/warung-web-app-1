<script>
export default {
  emits: ['changePage', 'postCategory'],
  data() {
    return {
      categoryForm: {
        name: "",
      },
    }
  },
  methods: {
    changePage(destination) {
      this.$emit('changePage', destination)
    },
    postCategory() {
      this.$emit('postCategory', this.categoryForm)
    }
  }
}
</script>
<template>
  <section
    class="mt-16"
  >
    <h1 class="text-2xl font-bold text-center">Add Category</h1>
    <div class="flex justify-center">
      <form
        action=""
        class="mt-4 px-10 py-10 max-w-lg shadow-lg"
        style="border: grey solid 0.5px"
        @submit.prevent="postCategory"
      >
        <div class="mb-4 flex-col">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            class="border-2 w-full px-4 py-2 mt-2"
            v-model="categoryForm.name"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-black px-4 py-2 text-white mt-4"
          >
            Add Category
          </button>
          <button
            class="w-full px-4 py-2 mt-4 border-2"
            @click.prevent="changePage('CategoryPage')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
