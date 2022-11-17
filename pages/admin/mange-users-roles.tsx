import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { FormEvent, useCallback, useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { getUsers, mangeUsersIds } from '../../api';
import Swal from 'sweetalert2';

const ROLES = ["PROJECT_MANAGER", "DEVELOPER"];

interface IUserOption {
  id: number;
  firstName: string;
  lastName: string;
  role: "PROJECT_MANAGER" | "DEVELOPER";
}

const MangeUsersRoles = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState<IUserOption[]>([]);
  const [usersIds, setUsersIds] = useState<number[]>([]);

  const [role, setRole] = useState("DEVELOPER");

  const init = useCallback(async () => {
    await getUsers().then((res) => { setUsers(res.data.users) }).catch((err) => { console.log(err) });
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (usersIds.length === 0 || !(role === "PROJECT_MANAGER" || role === "DEVELOPER"))
      return Swal.fire("unValid Data", "", "error");

    await mangeUsersIds({ role, usersIds })
      .then((res) => { Swal.fire("Success", res.data.massage, "success") })
      .catch((err) => { Swal.fire("Some Thing Went Wrong !", err.response.data.massage, "error") });

    setIsLoading(false);
    setUsersIds([]);
  }

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
                  <MenuItem key={index} value={name} >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="w-full flex flex-1 max-w-[300px]">
              <InputLabel id="demo-multiple-checkbox-label">Persons</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={usersIds}
                onChange={(event) => setUsersIds(event.target.value as number[])}
                input={<OutlinedInput label="User Name" />}
                renderValue={(selected) => {
                  const data = [];

                  for (let id of selected) {
                    const user = users.find(user => user.id === id);
                    if (user) data.push(user.firstName + " " + user.lastName);
                  }
                  return data.join(", ");
                }} >

                {users.map((user, index) => (
                  <MenuItem key={index} value={user.id} >
                    <Checkbox checked={usersIds.indexOf(user.id) > -1} />
                    <ListItemText primary={user.firstName + " " + user.lastName + `  (${user.role})`} />
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