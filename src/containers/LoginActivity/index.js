import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import DataTable from '../../components/DataTable'
import Loader from '../../components/Loader'
import DateFilter from '../../components/DateFilter'

const BEARER_TOKEN = process.env.REACT_APP_TOKEN
const URL =
  'https://forward-staging.livestories.com/api/businesses-login/99&filter='
const URL_STATES = 'http://forward-staging.livestories.com/api/states'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginBottom: theme.spacing(4),
    },
  },
}))

const LoginActivity = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dateFrom, setDateFrom] = useState(new Date(2020, 4, 1))
  const [dateTo, setDateTo] = useState(new Date())

  const handleDateFrom = (date) => {
    setDateFrom(date)
  }

  const handleDateTo = (date) => {
    setDateTo(date)
  }

  const getStates = async () => {
    const res = await fetch(URL_STATES)
    const results = await res.json()
    return results
  }

  useEffect(() => {
    setLoading(true)
    getStates()
      .then((rsp) => setStates(rsp))
      .catch((error) => setError(error))
  }, [])

  useEffect(() => {
    const getData = async () => {
      const uri = `{"from":"${format(
        dateFrom,
        'yyyy-MM-dd HH:mm'
      )}", "to":"${format(dateTo, 'yyyy-MM-dd HH:mm')}"}`
      const encoded = encodeURIComponent(uri)
      const newURL = `${URL}${encoded}`
      const res = await fetch(newURL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      })
      const results = await res.json()
      return results
    }
    if (states.length > 0) {
      getData()
        .then((rsp) => {
          const results = rsp.map((item) => {
            const name = states.find((ele) => ele.cd_state === item.cd_state)
            item.cd_state = name ? name.ds_name : '-'
            return item
          })
          setData(results)
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }
  }, [states, dateFrom, dateTo])

  const errorMessage = (error) => {
    return (
      <Typography variant="h4" component="h2">
        {error}
      </Typography>
    )
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4" component="h1">
          Login Activity Report
        </Typography>
      </div>
      <DateFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        handleDateFrom={handleDateFrom}
        handleDateTo={handleDateTo}
      />
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          errorMessage
        ) : (
          <DataTable rows={data} />
        )}
      </div>
    </div>
  )
}

export default LoginActivity
