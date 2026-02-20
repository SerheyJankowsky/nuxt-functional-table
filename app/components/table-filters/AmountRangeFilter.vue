<script setup lang="ts">
type RangeFilter = {
  min?: string
  max?: string
}

const props = defineProps<{
  modelValue?: RangeFilter
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RangeFilter]
}>()

function updateRange(partial: Partial<RangeFilter>) {
  emit('update:modelValue', {
    ...(props.modelValue ?? {}),
    ...partial
  })
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <input
      type="number"
      min="0"
      :value="props.modelValue?.min ?? ''"
      class="w-full rounded border px-2 py-1"
      placeholder="Min"
      @input="updateRange({ min: ($event.target as HTMLInputElement).value })"
    >
    <input
      type="number"
      min="0"
      :value="props.modelValue?.max ?? ''"
      class="w-full rounded border px-2 py-1"
      placeholder="Max"
      @input="updateRange({ max: ($event.target as HTMLInputElement).value })"
    >
  </div>
</template>
