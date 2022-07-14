import Box from '@mui/material/Box';
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import React, {useContext} from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {TruckContext} from "../contexts/TruckContext";

export function TruckFilter() {
  const {startTime, endTime, truckType, setStartTime, setEndTime, setTruckType} = useContext(TruckContext)
  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <DateTimePicker
          label="Start date"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue!)}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>

      <DateTimePicker
          label="End date"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue!)}
          renderInput={(params) => <TextField {...params} />}
        />
       </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="truck-type">Truck type</InputLabel>
        <Select
          labelId="truck-type"
          id="truck-type-select"
          value={truckType || ''}
          label="Truck type"
          onChange={e => {setTruckType(e.target.value)}}
        >
          <MenuItem value="">Any Truck</MenuItem>
          <MenuItem value="pick_up">Pick Up Truck</MenuItem>
          <MenuItem value="van">Van</MenuItem>
          <MenuItem value="small">Small Truck</MenuItem>
          <MenuItem value="medium">Medium Truck</MenuItem>
          <MenuItem value="large">Large Truck</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
