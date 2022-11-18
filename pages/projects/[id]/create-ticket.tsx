import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import React, { useState, useCallback, useEffect, FormEvent } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTicket, getAssignTo, getTagsOptions } from '../../../api';
import { ICreateTicket, IRate, ITicketPriority, ITicketTypes } from '../../../types/ticket';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';
import Toast from '../../../functions/sweetAlert'

const typeOptions: string[] = ["FEATURE", "BUG"]
const priorityOptions: string[] = ["LOW", "MEDIUM", "HIGH"]
const rateOptions: string[] = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10"]

interface IAssignedTo {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface IOptions {
  name: string
  inputValue?: string
}

const CreateTicket = () => {
  const [developers, setDevelopers] = useState<IAssignedTo[]>([])
  const [developer, setDeveloper] = useState<IAssignedTo | null>(null)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<ITicketTypes>("BUG");
  const [priority, setPriority] = useState<ITicketPriority>("MEDIUM");
  const [rate, setRate] = useState<IRate>("card5");
  const [tagsOptions, setTagsOptions] = useState<IOptions[]>([])
  const [tags, setTags] = useState<string[]>([])

  const router = useRouter()

  const init = useCallback(async () => {
    await getAssignTo()
      .then((res) => { setDevelopers(res.data.users) })
      .catch((err) => { console.log(err) });

    await getTagsOptions()
      .then((res) => { setTagsOptions(res.data.tags) })
      .catch((err) => { console.log(err) });

  }, [])

  useEffect(() => {
    init()
  }, [init]);

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);

    if (typeof developer?.id !== 'number') return;

    const data: ICreateTicket = {
      title,
      description,
      developerId: developer.id,
      rate,
      type,
      priority,
      tags
    }

    await createTicket(data, Number(router.query.id))
      .then((res) => {
        Toast.fire("Success Creating Ticket", res.data.massage, 'success')
        console.log(res)
      })
      .catch((err) => {
        Toast.fire("Some Thing Want Wrong!", err.response.data.massage, 'error')
        console.log(err)
      });

    setTitle("")
    setDescription("")
    setTags([])
    setDeveloper(null)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(router)
  }, [])

  return (
    <div className='w-full h-full items-center justify-center flex-col flex my-10'>
      <CssBaseline />

      <Box component='form' onSubmit={(e) => handelSubmit(e)} className='rounded-md gap-6 shadow-xl drop-shadow-xl bg-white px-8 pb-4 pt-8 w-full h-full flex justify-center items-center flex-col'>

        <Box className="justify-center flex-col items-center flex">
          <Avatar className="m-2 bg-blue-600 text-white" >
            <DesignServicesIcon />
          </Avatar>
          <Typography  className="text-xl  text-center"> Create a New Ticket </Typography>
        </Box>

        <Box className="sm:flex-row gap-6 sm:gap-2 flex-col w-full flex items-center justify-center">
          <TextField
            className="my-0"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            margin="normal"
            required
            fullWidth
            error={title.length < 8}
            id="title"
            helperText={title.length < 8 && "min length is 8 characters"}
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
          />

          <Autocomplete
            className="my-0"
            disablePortal
            id="combo-box-demo"
            options={developers}
            fullWidth
            value={developer}
            onChange={(event, value) => setDeveloper(value)}
            getOptionLabel={(item) => item.id + " " + item.firstName + " " + item.lastName + `   (${item.role})`}
            renderInput={(params) => (
              <TextField
                helperText={!developer && "Assign To User is required"}
                error={!developer}
                {...params} label="Assign To" />
            )}
          />
        </Box>

        <Autocomplete
          className={`w-full flex-1 flex`}
          multiple
          id="tags-filled"
          options={tagsOptions.map((option) => option.name)}
          freeSolo
          value={tags}
          onChange={(event, value) => {  if (value.length <= 4) setTags(value); }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              // eslint-disable-next-line react/jsx-key
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="tags"
              disabled={tags.length > 4}
              helperText={tags.length < 2 && "at last Insert Two Tags"}
              error={tags.length < 2}
              placeholder="tag"
            />
          )}
        />

        <Box className="sm:flex-row gap-6 sm:gap-2 flex-col w-full flex items-center justify-center">
          <FormControl className="w-full flex flex-1 ">
            <InputLabel id="demo-multiple-name-label">Ticket Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={type}
              onChange={(event) => {
                const value = event.target.value as ITicketTypes;
                setType(value)
              }}
              input={<OutlinedInput label="Type" />}
            >
              {typeOptions.map((type, index) => (
                <MenuItem key={index} value={type} >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full flex flex-1">
            <InputLabel id="demo-multiple-name-label">Ticket Priority</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={priority}
              onChange={(event) => {
                const value = event.target.value as ITicketPriority;
                setPriority(value);
              }}
              input={<OutlinedInput label="Priority" />}
            >
              {priorityOptions.map((priority, index) => (
                <MenuItem key={index} value={priority} >
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full flex flex-1">
            <InputLabel id="demo-multiple-name-label">Ticket Rate Count</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={rate}
              onChange={(event) => {
                const value = event.target.value as IRate;
                setRate(value);
              }}
              input={<OutlinedInput label="Rate" />}
            >
              {rateOptions.map((rate, index) => (
                <MenuItem key={index} value={rate} >
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>

        <Box className="flex-col gap-2 w-full flex items-center justify-center">
          <TextField
            className="w-full flex-1 mb-2"
            error={description.length < 20}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            id="description"
            helperText={description.length < 20 && "min length is 20 characters"}
            label="description"
            name="description"
          />

          <Button
            type={(isLoading) ? "reset" : "submit"}
            fullWidth
            variant="contained"
            className='mt-3 mb-4 bg-[#1976d2] hover:bg-[#1d81e6] text-white' >
            {(isLoading) ? (
              <CircularProgress size={28} className='text-white ' />
            ) : "Create"}
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default CreateTicket;