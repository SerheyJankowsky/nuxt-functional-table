<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import type { DynamicTableColumn } from '~/types/dynamic-table';

const props = defineProps<{
  column: DynamicTableColumn
  filterValue: unknown
  columnStyle: Record<string, string | undefined>
  sortDirection: 'asc' | 'desc' | null
  isDragSource: boolean
  isDragOver: boolean
  setHeaderElement: (columnKey: string, element: Element | ComponentPublicInstance | null) => void
}>()

const emit = defineEmits<{
  dragStart: [columnKey: string]
  dragOver: [columnKey: string]
  dragLeave: [columnKey: string]
  drop: [columnKey: string]
  dragEnd: []
  toggleSort: [column: DynamicTableColumn]
  setFilter: [columnKey: string, value: unknown]
  resizeStart: [event: MouseEvent, columnKey: string]
}>()
</script>

<template>
  <th
    :ref="(element) => props.setHeaderElement(props.column.key, element)"
    :style="props.columnStyle"
    class="relative min-w-48 border-b border-r p-3 text-left align-top transition-[background-color,box-shadow,transform,opacity] duration-200 last:border-r-0"
    :class="[
      props.isDragSource ? 'cursor-grabbing opacity-80 scale-[0.99] shadow-inner' : 'cursor-grab',
      props.isDragOver && !props.isDragSource ? 'bg-gray-100 ring-2 ring-inset ring-gray-300' : ''
    ]"
    draggable="true"
    @dragstart="emit('dragStart', props.column.key)"
    @dragover.prevent="emit('dragOver', props.column.key)"
    @dragenter.prevent="emit('dragOver', props.column.key)"
    @dragleave="emit('dragLeave', props.column.key)"
    @drop="emit('drop', props.column.key)"
    @dragend="emit('dragEnd')"
  >
    <div class="mb-2 flex items-center justify-between gap-2">
      <span class="font-semibold">{{ props.column.label }}</span>
      <button
        v-if="props.column.sortable"
        type="button"
        class="rounded border px-2 py-1 text-xs hover:bg-gray-100"
        @click="emit('toggleSort', props.column)"
      >
        <span v-if="props.sortDirection === 'asc'">Asc</span>
        <span v-else-if="props.sortDirection === 'desc'">Desc</span>
        <span v-else>Sort</span>
      </button>
    </div>

    <component
      :is="props.column.filterComponent"
      v-if="props.column.filterComponent"
      :model-value="props.filterValue"
      :column="props.column"
      @update:model-value="emit('setFilter', props.column.key, $event)"
    />
    <input
      v-else-if="props.column.filterable"
      :value="String(props.filterValue ?? '')"
      type="text"
      class="w-full rounded border px-2 py-1"
      :placeholder="`Filter ${props.column.label}`"
      @input="emit('setFilter', props.column.key, ($event.target as HTMLInputElement).value)"
    >

    <div
      class="absolute right-0 top-0 h-full w-2 cursor-col-resize select-none"
      @mousedown.stop.prevent="emit('resizeStart', $event, props.column.key)"
    />
  </th>
</template>
