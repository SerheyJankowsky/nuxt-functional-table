<script setup lang="ts">
import { toRef } from 'vue';
import { useDynamicTable } from '~/composables/useDynamicTable';
import type { DynamicTableColumn, TableRow } from '~/types/dynamic-table';

const props = withDefaults(
  defineProps<{
    columns: DynamicTableColumn[]
    rows: TableRow[]
    storageKey?: string
    rowKey?: string | ((row: TableRow, index: number) => string | number)
  }>(),
  {
    storageKey: 'dynamic-table',
    rowKey: 'id'
  }
)

const {
  orderedColumns,
  visibleColumns,
  sortedRows,
  filters,
  isColumnManagerOpen,
  enabledColumnKeys,
  dragSourceColumnKey,
  dragOverColumnKey,
  getSortDirection,
  toggleSort,
  setFilter,
  clearAllFilters,
  toggleColumn,
  resetColumns,
  onHeaderDragStart,
  onHeaderDragOver,
  onHeaderDragLeave,
  onHeaderDrop,
  onHeaderDragEnd,
  getColumnStyle,
  startColumnResize,
  setHeaderElement,
  resolveDisplayValue,
  resolveRowKey
} = useDynamicTable({
  columns: toRef(props, 'columns'),
  rows: toRef(props, 'rows'),
  storageKey: toRef(props, 'storageKey'),
  rowKey: toRef(props, 'rowKey')
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Dynamic Table</h2>
      <div class="relative flex items-center gap-2">
        <button
          type="button"
          class="rounded border px-3 py-2 text-sm hover:bg-gray-50"
          @click="isColumnManagerOpen = !isColumnManagerOpen"
        >
          Columns
        </button>
        <button
          type="button"
          class="rounded border px-3 py-2 text-sm hover:bg-gray-50"
          @click="clearAllFilters"
        >
          Clear Filters
        </button>
        <button
          type="button"
          class="rounded border px-3 py-2 text-sm hover:bg-gray-50"
          @click="resetColumns"
        >
          Reset Columns
        </button>

        <div
          v-if="isColumnManagerOpen"
          class="absolute right-0 top-12 z-10 min-w-56 rounded border bg-white p-3 shadow"
        >
          <p class="mb-2 text-sm font-medium">Enable Columns</p>
          <label
            v-for="column in orderedColumns"
            :key="`manager-${column.key}`"
            class="mb-1 flex cursor-pointer items-center gap-2 text-sm last:mb-0"
          >
            <input
              type="checkbox"
              :checked="enabledColumnKeys.includes(column.key)"
              @change="toggleColumn(column.key)"
            >
            <span>{{ column.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto rounded border">
      <table class="min-w-full border-collapse text-sm">
        <thead class="bg-gray-50">
          <tr>
            <DynamicTableHeader
              v-for="column in visibleColumns"
              :key="column.key"
              :column="column"
              :filter-value="filters[column.key]"
              :column-style="getColumnStyle(column.key)"
              :sort-direction="getSortDirection(column.key)"
              :is-drag-source="dragSourceColumnKey === column.key"
              :is-drag-over="dragOverColumnKey === column.key"
              :set-header-element="setHeaderElement"
              @drag-start="onHeaderDragStart"
              @drag-over="onHeaderDragOver"
              @drag-leave="onHeaderDragLeave"
              @drop="onHeaderDrop"
              @drag-end="onHeaderDragEnd"
              @toggle-sort="toggleSort"
              @set-filter="setFilter"
              @resize-start="startColumnResize"
            />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in sortedRows"
            :key="resolveRowKey(row, rowIndex)"
            class="border-b last:border-b-0"
          >
            <DynamicTableCell
              v-for="column in visibleColumns"
              :key="`${resolveRowKey(row, rowIndex)}-${column.key}`"
              :row="row"
              :row-key="resolveRowKey(row, rowIndex)"
              :column="column"
              :value="resolveDisplayValue(row, column)"
              :column-style="getColumnStyle(column.key)"
            />
          </tr>
          <tr v-if="sortedRows.length === 0">
            <td
              :colspan="Math.max(visibleColumns.length, 1)"
              class="p-4 text-center text-gray-500"
            >
              No rows match the current filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>