<script>
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
export default {
  props: ["data", "actionButton"],
  emits: ["actionButtonEvent", "updateFoodStatus"],
  data() {
    return {
      columns: [],
    };
  },
  components: { TableHead, TableRow },
  methods: {
    getColumns() {
      for (const key in this.data["0"]) {
        if (key !== "id" && key !== "canChangeStatus" && key !== 'canEdit') this.columns.push(`${key}`);
      }
    },
    actionButtonEvent(id) {
      this.$emit("actionButtonEvent", id);
    },
    updateFoodStatus(payload) {
      this.$emit("updateFoodStatus", payload);
    },
  },
  mounted() {
    try {
      this.getColumns();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<template>
  <table class="w-full" style="border: grey solid 0.5px">
    <TableHead :columns="columns" :actionButton="actionButton" />
    <tbody>
      <TableRow
        :columns="columns"
        :data="data"
        :actionButton="actionButton"
        @actionButtonEvent="actionButtonEvent"
        @updateFoodStatus="updateFoodStatus"
      />
    </tbody>
  </table>
</template>
