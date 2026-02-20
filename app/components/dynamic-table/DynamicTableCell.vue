<script setup lang="ts">
import type { DynamicTableColumn, TableRow } from '~/types/dynamic-table';

const props = defineProps<{
  row: TableRow
  column: DynamicTableColumn
  rowKey: string | number
  value: unknown
  columnStyle: Record<string, string | undefined>
}>()
</script>

<template>
  <td
    :key="`${props.rowKey}-${props.column.key}`"
    :style="props.columnStyle"
    class="border-r p-3 align-top last:border-r-0"
  >
    <component
      :is="props.column.cellComponent"
      v-if="props.column.cellComponent"
      :row="props.row"
      :column="props.column"
      :value="props.value"
    />
    <span v-else>{{ props.value }}</span>
  </td>
</template>
