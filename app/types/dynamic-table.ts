import type { Component } from 'vue'

export type TableRow = Record<string, any>
export type ValueResolver = string | ((row: TableRow) => unknown)

export interface DynamicTableColumn {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  sortKey?: ValueResolver
  filterKey?: ValueResolver
  formatter?: (value: unknown, row: TableRow) => string
  filterFn?: (row: TableRow, filterValue: unknown, column: DynamicTableColumn) => boolean
  cellComponent?: Component
  filterComponent?: Component
}
