import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { FormEvent, useCallback, useEffect, useState } from 'react'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { createProject, getProjectMangers } from '../../api';
import Swal from 'sweetalert2';


interface IProjectManger {
  id: number;
  firstName: string;
  lastName: string;
}

const CreateProject = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [projectsMangers, setProjectsMangers] = useState<IProjectManger[]>([])
  const [projectManger, setProjectManger] = useState<IProjectManger | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const init = useCallback(async () => {
    await getProjectMangers().then((res) => { setProjectsMangers(res.data.users) }).catch((err) => { console.log(err) })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!projectManger?.id || title.length < 8 || description.length < 20) return Swal.fire("unValid information", "", 'error')
    await createProject({ projectMangerId: projectManger?.id, title, description })
    .then((res) => { Swal.fire("Success", res.data.massage, 'success') })
    .catch((err) => { Swal.fire("Some Thing Went Wrong !", err.response.data.massage, 'error') });
    setIsLoading(false)
  }

  return (
    <Container component="main" className='w-full h-full my-20 flex justify-center items-center'>
      <CssBaseline />
      <Box
        className='rounded-md shadow-xl drop-shadow-xl bg-slate-100 px-8 py-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-full flex justify-center items-center flex-col mt-2'>
        <Box className="w-full flex-col justify-center items-center flex mb-8">
          <Avatar className="m-2 bg-blue-600 text-white" >
            <DesignServicesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Project
          </Typography>
        </Box>

        <Box component="form" onSubmit={(event) => handleSubmit(event)} className="mt-2">

          <Box className="w-full flex-1 flex-row gap-4 justify-center items-center flex mb-6">
            <TextField
              className="my-0"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              margin="normal"
              required
              fullWidth
              error={title.length < 8}
              id="title"
              helperText="min length is 8 characters"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />

            <Autocomplete
              className="my-0"
              disablePortal
              id="combo-box-demo"
              options={projectsMangers}
              fullWidth
              value={projectManger}
              onChange={(event, value) => setProjectManger(value)}
              getOptionLabel={(item) => item.firstName + " " + item.lastName}
              renderInput={(params) => (
                <TextField 
                helperText="project manger is required"
                error={!projectManger}
                {...params} label="ProjectManger" />
              )}
            />


          </Box>

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
            helperText="min length is 20 characters"
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
    </Container>
  )
}

export default CreateProject;