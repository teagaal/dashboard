import React from 'react'
import MUIDataTable from 'mui-datatables'

const columns = [
  {
    name: 'idBusiness',
    label: 'Id',
    options: {
      display: 'excluded',
    },
  },
  {
    name: 'ds_companyname',
    label: 'Name',
  },
  {
    name: 'ds_addressline1',
    label: 'Address',
  },
  {
    name: 'ds_city',
    label: 'City',
  },
  {
    name: 'cd_state',
    label: 'State',
  },
  {
    name: 'ds_postalcode',
    label: 'Zip Code',
  },
  {
    name: 'ds_phone',
    label: 'Phone',
  },
  {
    name: 'ds_website',
    label: 'Website',
  },
  {
    name: 'ds_email',
    label: 'User Email',
  },
]

const options = {
  selectableRows: 'none',
  filter: false,
  print: false,
  viewColumns: false,
  tableBodyHeight: '650px',
  rowsPerPageOptions: [10, 50, 100],
}

const DataTable = ({ rows }) => {
  return <MUIDataTable columns={columns} data={rows} options={options} />
}

export default DataTable
