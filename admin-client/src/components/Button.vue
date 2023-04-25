<script>
export default {
  props: ["buttonName", 'buttonType', 'type'],
  emits: ['triggeredFunction'],
  methods: {
    triggerFunction() {
      this.$emit('triggeredFunction')
    }
  }, 
};
</script>
<template>
  <button
    @click.prevent="triggerFunction"
    type="{{ type }}"
    class="w-full px-4 py-2 mt-4 bg-black text-white"
    v-if="buttonType === 'primary'"
    >
    {{ buttonName }}
  </button>

  <button
    @click.prevent="triggerFunction"
    type="{{ type }}"
    class="w-full px-4 py-2 mt-4 border-2"
    v-if="buttonType === 'secondary'"
    >
    {{ buttonName }}
  </button>
</template>
