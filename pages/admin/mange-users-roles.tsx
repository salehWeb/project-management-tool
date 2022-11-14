import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { FormEvent, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { mangeUsersIds } from '../../api';

const ROLES = ["PROJECT_MANGER", "DEVELOPER", "USER"];

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const MangeUsersRoles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);
  const [role, setRole] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

// mangeUsersIds({})
    setIsLoading(false)
  }

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {target: { value }} = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value,);
  };

  return (
    <Container component="main" className='w-full h-full my-20 flex justify-center items-center'>
      <CssBaseline />
      <Box
        className='rounded-md shadow-xl drop-shadow-xl bg-slate-100 px-8 py-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-full flex justify-center items-center flex-col mt-2'>
        <Box className="w-full flex-col justify-center items-center flex mb-8">
          <Avatar className="m-2 bg-blue-600 text-white" >
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mange Users Roles
          </Typography>
        </Box>

        <Box component="form" onSubmit={(event) => handleSubmit(event)} className="mt-2 w-full">

          <Box className="w-full flex-1 flex-col gap-4 flex mb-6">


            <FormControl className="w-full flex flex-1">
              <InputLabel id="demo-multiple-name-label">Role</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                input={<OutlinedInput label="Role" />} 
                >
                {ROLES.map((name, index) => (
                  <MenuItem  key={index} value={name} >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="w-full flex flex-1">
              <InputLabel id="demo-multiple-checkbox-label">Persons</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name} >
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>

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

export default MangeUsersRoles;