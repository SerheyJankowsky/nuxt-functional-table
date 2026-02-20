<script setup lang="ts">
const props = defineProps<{
  row: {
    statusCode?: string
  }
  value: string
}>()

const statusClassMap: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  active: 'bg-emerald-100 text-emerald-800',
  blocked: 'bg-rose-100 text-rose-800'
}
</script>

<template>
  <span
    class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
    :class="statusClassMap[props.row.statusCode || ''] ?? 'bg-gray-100 text-gray-700'"
  >
    {{ props.value }}
  </span>
</template>
