import { useState, useEffect, useCallback } from 'react'
import prisma from '../../../libs/prisma';
import { IRate, ITicketPriority, ITicketStatus, ITicketTypes } from '../../../types/ticket';
import moment from 'moment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { getTicketsTypesForProjectPage } from '../../../api';
import Tickets from '../../../components/Tickets';

interface IProject {
  createdAt: Date;
  id: number;
  description: string;
  isClosed: boolean;
  title: string;
  projectManger: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface IProjectPageProps {
  project: IProject
}

interface ITicketType {
  type: ITicketTypes;
}

const ProjectPage = ({ project }: IProjectPageProps) => {
  const [tickets, setTickets] = useState<ITicketType[]>([]);

  const init = useCallback(async () => {
    await getTicketsTypesForProjectPage(project.id)
      .then((res) => { setTickets(res.data.tickets) })
      .catch((err) => { console.log(err) });
  }, [project.id])

  useEffect(() => {
    init()
  }, [init])

  return (
    <Container className="my-10 flex justify-center flex-col items-center">
      <CssBaseline />
      <Box className="w-full grid mt-10 gap-5 justify-evenly grid-cols-3 h-20 md:h-30 lg:h-40  items-center">

        <Box
          className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
          {tickets.length ? (
            <>
              <Typography variant='h5' component='p'>{tickets.length > 1 ? "Tickets" : "Ticket"}</Typography>
              <Typography className="text-lg">{tickets.length}</Typography>
            </>
          ) : (
            <>
              <Typography variant='h5' component='p'>Tickets</Typography>
              <Typography variant="h6">None</Typography>
            </>
          )}

        </Box>

        <Box
          className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
          {tickets.filter((ticket) => ticket.type === "BUG").length ? (
            <>
              <Typography variant='h5' component='p'>{tickets.filter((ticket) => ticket.type === "BUG").length > 1 ? "Bugs" : "Bug"}</Typography>
              <Typography className="text-lg">{tickets.filter((ticket) => ticket.type === "BUG").length}</Typography>
            </>
          ) : (
            <>
              <Typography variant='h5' component='p'>Bugs</Typography>
              <Typography variant="h6">None</Typography>
            </>
          )}
        </Box>

        <Box
          className="flex w-full text-white font-semibold flex-col hover-animation-card bg-blue-400 items-center justify-center rounded-md shadow-md h-full text-center">
          {tickets.filter((ticket) => ticket.type === "FEATURE").length ? (
            <>
              <Typography variant='h5' component='p'>{tickets.filter((ticket) => ticket.type === "FEATURE").length > 1 ? "Features" : "Feature"}</Typography>
              <Typography className="text-lg">{tickets.filter((ticket) => ticket.type === "FEATURE").length}</Typography>
            </>
          ) : (
            <>
              <Typography variant='h5' component='p'>Features</Typography>
              <Typography variant="h6">None</Typography>
            </>
          )}
        </Box>


      </Box>

      <Box className="w-full flex bg-white shadow-md rounded-md px-10 py-8 flex-col mt-10 ">

        <Box className="flex justify-between items-center">
          <Typography variant='h4' component='h2' className="underLine mb-8 lg:mb-10">{project.title} </Typography>
          <Typography><strong>Created At: </strong> {moment(project.createdAt).format('ll')}</Typography>
        </Box>

        <Box className="flex flex-row min-w-full mb-8 lg:mb-10 justify-evenly items-center">
          <Typography variant='h5' component='p' className="text-gray-700"><strong>State: </strong> {project.isClosed ? "Closed" : "Open"}</Typography>
        </Box>

        <strong>description: </strong>
        <Typography paragraph className="text-md text-left text-gray-500">{project.description}</Typography>
      </Box>

      <Tickets projectId={project.id}/>
    </Container>
  )
}

export default ProjectPage;



interface IPath {
  params: {
    id: string,
  },
}
export async function getStaticPaths() {
  const projectsIds = await prisma.project.findMany({
    select: {
      id: true
    },
  });
  let paths: IPath[] = [];

  for (let projectId of projectsIds) {
    paths.push({ params: { id: projectId.id.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}



export async function getStaticProps({ params }: IPath) {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      createdAt: true,
      description: true,
      projectManger: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      isClosed: true,
      title: true,
    },
  });

  return {
    props: { project: JSON.parse(JSON.stringify(project)) || null },
  };
}