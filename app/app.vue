<script setup lang="ts">
import type { NuxtTableColumn, NuxtTableManualFilterChange, NuxtTableManualSortChange } from "@serhiitupilow/nuxt-table/runtime";

const columns: NuxtTableColumn[] = [
  { key: "id", label: "ID", sortable: true, filterable: true, },
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "status", label: "Status", sortable: true, filterable: true },
];

const rows = [
  { id: 1, name: "Alice", status: "active" },
  { id: 2, name: "Bob", status: "paused" },
];

function onColumnOrderChange(payload: {
  order: string[];
  movedKey: string;
  fromIndex: number;
  toIndex: number;
}) {
  console.log("new order", payload.order);
}

function onManualSortChange(payload: NuxtTableManualSortChange) {
  console.log("manual sort change", payload);
}

function onManualFilterChange(payload: NuxtTableManualFilterChange) {
  console.log("manual filter change", payload);
}

</script>

<template>
  <main class="mx-auto max-w-6xl p-6">
    <h1 class="mb-4 text-2xl font-bold">Nuxt Dynamic Table Demo</h1>
    <NuxtTable
    :columns="columns"
    :rows="rows"
    storage-key="users-table"
    :enable-column-dnd="true"
    :enable-column-resize="true"
    @column-order-change="onColumnOrderChange"
    @manual-sort-change="onManualSortChange"
    @manual-filter-change="onManualFilterChange"
    />
  </main>
</template>
