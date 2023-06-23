import axios from 'axios'

export let data

// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
  data = response.data
})

export const reOrderColumns = [
  {
    name: 'Amount',
    reorder: true,
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Status',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.full_name
  },
  {
    name: 'Mode',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.email
  },
  {
    name: 'Bill',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.post
  },
  {
    name: 'Vendor',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Date/Updated Time',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.salary
  }
]