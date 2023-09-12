<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    cell: {
      type: String,
      required: true
    },
    modelValue: Boolean // Use a modelValue prop for v-model
  })

  const emit = defineEmits()

  // Use a ref to keep track of the selection state
  const isSelected = ref(props.modelValue || false)

  const cleanCell = computed(() => props.cell.replace('Seat', ''))

  const icon = defineAsyncComponent(() => import(`../assets/${props.name}.svg`))

  // Emit an event when the selection changes
  watch(isSelected, newValue => {
    emit('update:modelValue', newValue) // Emit the updated selection state
  })
</script>

<template>
  <div
    class="seat-icon"
    :class="{ selected: isSelected }"
    style="width: 100%; height: 100%"
    @click="isSelected = !isSelected"
  >
    <component :is="icon" style="width: 100%; height: 100%" />
  </div>
</template>

<style scoped>
  .seat-icon {
    width: 4rem;
    height: 4rem;
    cursor: pointer; /* Add cursor pointer to indicate clickability */
  }

  .selected {
    border: 2px solid blue; /* Add a border to indicate selection */
  }
</style>
