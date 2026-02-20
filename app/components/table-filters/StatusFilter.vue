<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <select
    :value="modelValue ?? ''"
    class="w-full rounded border px-2 py-1"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="active">Active</option>
    <option value="blocked">Blocked</option>
  </select>
</template>
