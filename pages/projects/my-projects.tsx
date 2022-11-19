import { Box, Container, CssBaseline, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { getProjectsStatus } from '../../api'
import Projects from '../../components/Projects';

interface ProjectState {
  isClosed: boolean;
}


const MyProjects = () => {
  const [projects, setProjects] = useState<ProjectState[]>([])
  const init = useCallback(async () => {
    await getProjectsStatus()
          .then((res) => { setProjects(res.data.projects) })
          .catch((err) => { console.log(err) });

  }, []);

  useEffect(() => {
    init()
  }, [init]);

  return (
    <Container className="my-10 min-h-[100vh] w-full flex flex-col items-start justify-start">
      <CssBaseline />
    <Box className="w-full grid mt-10 gap-5 justify-evenly grid-cols-3 h-20 md:h-30 lg:h-40  ">

      <Box
        className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
        {projects.length ? (
          <>
            <Typography variant='h5' component='p'>{projects.length > 1 ? "Projects" : "Project"}</Typography>
            <Typography className="text-lg">{projects.length}</Typography>
          </>
        ) : (
          <>
            <Typography variant='h5' component='p'>Projects</Typography>
            <Typography variant="h6">None</Typography>
          </>
        )}

      </Box>

      <Box
        className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
        {projects.filter((project) => project.isClosed === true).length ? (
          <>
            <Typography variant='h5' component='p'>{projects.filter((project) => project.isClosed === true).length > 1 ? "Closed Projects" : "Closed Project"}</Typography>
            <Typography className="text-lg">{projects.filter((project) => project.isClosed === true).length}</Typography>
          </>
        ) : (
          <>
            <Typography variant='h5' component='p'>Closed Projects</Typography>
            <Typography variant="h6">None</Typography>
          </>
        )}
      </Box>

      <Box
        className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
        {projects.filter((project) => project.isClosed === false).length ? (
          <>
            <Typography variant='h5' component='p'>{projects.filter((project) => project.isClosed === false).length > 1 ? "Open Projects" : "Open Project"}</Typography>
            <Typography className="text-lg">{projects.filter((project) => project.isClosed === false).length}</Typography>
          </>
        ) : (
          <>
            <Typography variant='h5' component='p'>Open Projects</Typography>
            <Typography variant="h6">None</Typography>
          </>
        )}
      </Box>


    </Box>



    <Projects />
  </Container>
  )
}

export default MyProjects;