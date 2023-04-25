<script>
import EditButton from "./EditButton.vue";
import DeleteButton from "./DeleteButton.vue";

export default {
  components: { EditButton, DeleteButton },
  props: ["data", "columns", "actionButton"],
  emits: ["actionButtonEvent", 'updateFoodStatus'],
  methods: {
    actionButtonEvent(id) {
      this.$emit("actionButtonEvent", id);
    },
    updateFoodStatus(payload) {
      this.$emit('updateFoodStatus', payload)
    }
  },
};
</script>
<template>
  <tr v-for="(item, index) in data" :key="index">
    <td class="p-2" style="border: grey solid 0.5px">
      {{ index + 1 }}
    </td>
    <td
      class="p-2"
      style="border: grey solid 0.5px"
      v-for="(column, indexColumn) in columns"
      :key="indexColumn"
    >
      <img
        :src="item.imgUrl"
        style="max-width: 200px"
        v-if="column === 'imgUrl'"
      />

      <select v-else-if="column === 'status' && item.canChangeStatus" @change="updateFoodStatus({status: $event.target.value, id: item.id})">
        <option :selected="item.status === 'Active'" value="Active">Active</option>
        <option :selected="item.status === 'Inactive'" value="Inactive">Inactive</option>
        <option :selected="item.status === 'Archived'" value="Archived">Archived</option>
      </select>

      <p v-else-if="column === 'User'">{{ item.User.email }}</p>

      <p v-else-if="column === 'Category'">{{ item.Category.name }}</p>

      <p v-else>
        {{ item[column] }}
      </p>
    </td>
    <td class="p-2 text-center align-middle" style="border: grey solid 0.5px">
      <DeleteButton
        @click.prevent="actionButtonEvent(item.id)"
        v-if="actionButton === 'DeleteButton'"
      />
      <EditButton
        @click.prevent="actionButtonEvent(item.id)"
        v-if="actionButton === 'EditButton' && item.canEdit"
      />
    </td>
  </tr>
</template>
