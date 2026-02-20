<script setup lang="ts">
const { rows, columns } = useDemoDynamicTable()
</script>

<template>
  <main class="mx-auto max-w-6xl p-6">
    <h1 class="mb-4 text-2xl font-bold">Nuxt Dynamic Table Demo</h1>
    <DynamicTable
      storage-key="nuxt-dynamic-table-demo"
      :rows="rows"
      :columns="columns"
    />
  </main>
</template>
