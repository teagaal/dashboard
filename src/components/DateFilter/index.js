import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  spacer: {
    marginRight: '10px',
  },
}))

const DateFilter = ({ dateFrom, dateTo, handleDateFrom, handleDateTo }) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormGroup row>
        <KeyboardDatePicker
          clearable
          value={dateFrom}
          placeholder={new Date()}
          label="From"
          onChange={(date) => handleDateFrom(date)}
          format="MM/dd/yyyy"
          disableFuture
          className={classes.spacer}
        />
        <KeyboardDatePicker
          clearable
          value={dateTo}
          placeholder={new Date()}
          label="To"
          onChange={(date) => handleDateTo(date)}
          format="MM/dd/yyyy"
          disableFuture
        />
      </FormGroup>
    </MuiPickersUtilsProvider>
  )
}

export default DateFilter
