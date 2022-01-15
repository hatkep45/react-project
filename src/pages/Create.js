import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('male')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch( ' http://localhost:8000/notes',{
      method: 'POST',
      headers : {"Content-type":"application/json"},
      body: JSON.stringify({title,details,category})
      }).then(()=> history.push('/') )
    } 
  }

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Patient Details
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Patient Name" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Email Address"
          variant="outlined"
          color="secondary"
          multiline
          rows={2}
          HalfWidth
          required
          error={detailsError}
        />
         <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Mobile No"
          variant="outlined"
          color="secondary"
          multiline
          rows={2}
          HalfWidth
          required
          error={detailsError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Permanent Address"
          variant="outlined"
          color="secondary"
          multiline
          rows={2}
          HalfWidth
          required
          error={detailsError}
          anchor="right"
        />
 
        {/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

        <FormControl className={classes.field}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Others" />
            </RadioGroup>
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel>Marital Status</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="Married" control={<Radio />} label="Married" />
            <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
            </RadioGroup>
            </FormControl>
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
}