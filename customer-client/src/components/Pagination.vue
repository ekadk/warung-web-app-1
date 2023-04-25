<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useMainStore } from "../stores/main";
import Paginate from "vuejs-paginate-next";

export default {
  components: { paginate: Paginate },
  computed: {
    ...mapState(useMainStore, ["totalPages"]),
    ...mapWritableState(useMainStore, ['filter'])
  },
  methods: {
    ...mapActions(useMainStore, [
      "clickCallback",
    ]),
  },
};
</script>
<template>
  <div class="w-full flex justify-center">
    <paginate
      class="flex gap-8"
      :v-model="filter.page"
      :page-count="totalPages"
      :page-range="3"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<style>
.pagination {
  display: flex;
}

.page-item a {
  cursor: pointer;
  padding: 10px;
}
.pagination .page-item.active {
  background-color: black;
  color: white;
}

.pagination .page-item:hover:not(.active) {
  background-color: #ddd;
}
</style>