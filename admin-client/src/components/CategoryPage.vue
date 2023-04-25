<script>
export default {
  props: ["categories"],
  emits: ["deleteCategory", 'changePage'],
  methods: {
    changePage(destination) {
      this.$emit('changePage', destination)
    },
    deleteCategory(id) {
      this.$emit("deleteCategory", id);
    },
  },
};
</script>
<template>
  <section class="w-full px-8">
    <h1 class="font-bold text-4xl mt-8 mb-4 text-center">Categories</h1>
    <div class="flex justify-end">
      <div class="mb-8">
        <a
          class="py-2 px-4 bg-black text-white flex gap-2 align-middle items-center"
          href=""
          style="border: grey solid 0.5px"
          @click.prevent="changePage('CategoryForm')"
        >
          <i class="fa-regular fa-square-plus"></i>Add Category</a
        >
      </div>
    </div>
    <div>
      <table class="" style="border: grey solid 0.5px">
        <thead>
          <th class="p-2" style="border: grey solid 0.5px">#</th>
          <th class="p-2" style="border: grey solid 0.5px">Name</th>
          <th class="p-2" style="border: grey solid 0.5px">Action</th>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories">
            <td class="p-2" style="border: grey solid 0.5px">
              {{ index + 1 }}
            </td>
            <td class="p-2 w-full text-center" style="border: grey solid 0.5px">
              {{ category.name }}
            </td>
            <td
              class="p-2 text-center align-middle w-full"
              style="border: grey solid 0.5px"
            >
              <a href="" @click.prevent="deleteCategory(category.id)">
                <i class="fa-solid fa-trash text-red-600"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
