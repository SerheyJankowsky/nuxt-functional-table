import { markRaw } from 'vue'
import StatusPill from '~/components/table-cells/StatusPill.vue'
import AmountRangeFilter from '~/components/table-filters/AmountRangeFilter.vue'
import StatusFilter from '~/components/table-filters/StatusFilter.vue'
import type { DynamicTableColumn } from '~/types/dynamic-table'

type DemoRow = {
  id: number
  customer: string
  email: string
  statusCode: 'pending' | 'active' | 'blocked'
  statusLabel: string
  amountCents: number
  createdAt: string
  region: string
}

type RangeFilterValue = {
  min?: string
  max?: string
}

export function useDemoDynamicTable() {
  const rows: DemoRow[] = [
    {
      id: 1,
      customer: 'Alice Johnson',
      email: 'alice@northwind.dev',
      statusCode: 'active',
      statusLabel: 'Active',
      amountCents: 25900,
      createdAt: '2026-01-11',
      region: 'US'
    },
    {
      id: 2,
      customer: 'Brian Smith',
      email: 'brian@acme.test',
      statusCode: 'pending',
      statusLabel: 'Pending',
      amountCents: 8400,
      createdAt: '2026-01-30',
      region: 'EU'
    },
    {
      id: 3,
      customer: 'Carla Gomez',
      email: 'carla@oceanic.test',
      statusCode: 'blocked',
      statusLabel: 'Blocked',
      amountCents: 19900,
      createdAt: '2026-02-02',
      region: 'APAC'
    },
    {
      id: 4,
      customer: 'David Lee',
      email: 'david@northwind.dev',
      statusCode: 'active',
      statusLabel: 'Active',
      amountCents: 31500,
      createdAt: '2026-02-10',
      region: 'EU'
    },
    {
      id: 5,
      customer: 'Emma Clark',
      email: 'emma@contoso.test',
      statusCode: 'pending',
      statusLabel: 'Pending',
      amountCents: 12100,
      createdAt: '2026-02-15',
      region: 'US'
    }
  ]

  const columns: DynamicTableColumn[] = [
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      filterable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true
    },
    {
      key: 'statusLabel',
      label: 'Status',
      sortable: true,
      cellComponent: markRaw(StatusPill),
      filterComponent: markRaw(StatusFilter),
      filterKey: 'statusCode',
      filterFn: (row: Record<string, any>, filterValue: unknown) => {
        if (!filterValue) {
          return true
        }
        return row.statusCode === filterValue
        },
    },
    {
      key: 'amountCents',
      label: 'Amount',
      sortable: true,
      filterComponent: markRaw(AmountRangeFilter),
      filterFn: (row: Record<string, any>, filterValue: unknown) => {
        const rangeValue = filterValue as RangeFilterValue | undefined
        const min = Number(rangeValue?.min || 0)
        const maxText = rangeValue?.max
        const max = maxText ? Number(maxText) : Number.POSITIVE_INFINITY
        const amount = Number(row.amountCents)
        return amount >= min && amount <= max
      },
      formatter: (value: unknown) => `$${(Number(value) / 100).toFixed(2)}`
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      filterable: true,
      sortKey: (row: Record<string, any>) => new Date(row.createdAt).getTime()
    },
    {
      key: 'region',
      label: 'Region',
      sortable: true,
      filterable: true
    }
  ]

  return {
    rows,
    columns
  }
}
