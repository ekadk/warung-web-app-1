<script>
export default {
  props: ['columns', "actionButton"]
}
</script>
<template>
    <thead>
      <th class="p-2" style="border: grey solid 0.5px">#</th>
      <th class="p-2" style="border: grey solid 0.5px" v-for="column in columns">{{ column }}</th>
      <th class="p-2" style="border: grey solid 0.5px" v-if="actionButton">Action</th>
    </thead>
</template>
