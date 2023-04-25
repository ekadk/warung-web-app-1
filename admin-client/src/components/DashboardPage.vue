<script>
  export default {
    props: [
    'food',
    'activeFood',
    'inactiveFood',
    'categories',
    'logs',
    ],
    data() {
      return {

      }
    }
  }
</script>
<template>
  <section class="w-full px-8">
    <h1 class="font-bold text-4xl mt-8 mb-8 text-center">Dashboard</h1>
    <div>
      <h2 class="text-2xl mt-8 mb-8 text-center">Statistics</h2>
      <div class="grid grid-cols-4 gap-8">
        <div class="col-span-1">
          <div class="h-full p-4 text-center" style="border: grey solid 0.5px">
            <p class="text-xl">Products:</p>
            <p class="font-bold text-2xl">{{ food.length }}</p>
          </div>
        </div>
        <div class="col-span-1">
          <div class="h-full p-4 text-center" style="border: grey solid 0.5px">
            <p class="text-xl">Categories:</p>
            <p class="font-bold text-2xl">{{ categories.length }}</p>
          </div>
        </div>
        <div class="col-span-1">
          <div class="h-full p-4 text-center" style="border: grey solid 0.5px">
            <p class="text-xl">Active Products:</p>
            <p class="font-bold text-2xl">{{ activeFood.length }}</p>
          </div>
        </div>
        <div class="col-span-1">
          <div class="h-full p-4 text-center" style="border: grey solid 0.5px">
            <p class="text-xl">Inactive Products:</p>
            <p class="font-bold text-2xl">{{ inactiveFood.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl mt-8 mb-8 text-center">Logs</h2>
      <table class="w-full" style="border: grey solid 0.5px">
        <thead>
          <th class="p-2" style="border: grey solid 0.5px">#</th>
          <th class="p-2" style="border: grey solid 0.5px">Product Name</th>
          <th class="p-2" style="border: grey solid 0.5px">Description</th>
          <th class="p-2" style="border: grey solid 0.5px">Updated By</th>
          <th class="p-2" style="border: grey solid 0.5px">Updated At</th>
        </thead>
        <tbody>
          <tr v-for="(log, index) in logs">
            <td class="p-2" style="border: grey solid 0.5px">
              {{ index + 1 }}
            </td>
            <td class="p-2" style="border: grey solid 0.5px">
              {{ log.productName }}
            </td>
            <td class="p-2" style="border: grey solid 0.5px">
              {{ log.description }}
            </td>
            <td class="p-2" style="border: grey solid 0.5px">
              {{ log.updatedBy }}
            </td>
            <td class="p-2" style="border: grey solid 0.5px">
              {{ log.updatedAt }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
