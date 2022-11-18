import { useState, useEffect, useCallback } from 'react'
import prisma from '../../../libs/prisma';
import { IRate, ITicketPriority, ITicketStatus, ITicketTypes } from '../../../types/ticket';
import moment from 'moment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { getTicketsForProjectPage, getTicketsLengthForProjectPage } from '../../../api';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface ITicket {
  id: number;
  title: string;
  tags: {
    name: string;
  }[];
  developer: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  completedAt: Date | null;
  type: ITicketTypes;
  priority: ITicketPriority;
  status: ITicketStatus;
  rate: IRate;
  comments: {
    id: number;
  }[];
}

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

const ProjectPage = ({ project }: IProjectPageProps) => {

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [ticketPages, setTicketPages] = useState<number[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [activePage, setActivePage] = useState(0)

  const init = useCallback(async () => {
    await getTicketsLengthForProjectPage(project.id)
      .then((res) => {
        const pages = [];
        for (let i = 0; i < Math.ceil(res.data.length / take); i++) { pages.push(i) };
        setTicketPages(pages);
      })
      .catch((err) => { console.error(err) });

  }, [project.id, take])

  const getTicketPagination = useCallback(async () => {
    await getTicketsForProjectPage(project.id, skip, take)
      .then((res) => { setTickets(res.data.tickets) })
      .catch((err) => { console.log(err) });
  }, [project.id, skip, take])

  useEffect(() => {
    getTicketPagination()
  }, [getTicketPagination])

  useEffect(() => {
    init()
  }, [init])

  const handelNextPage = () => {
    const page = (activePage + 1);
    if (activePage < (ticketPages.length - 1)) setActivePage(page);
    setSkip(page * take);
  }

  const handelPreviousPage = () => {
    const page = (activePage - 1);
    if (activePage > 0) setActivePage(page);
    setSkip(page * take);
  }

  const handelToPage = (pageIndex: number) => {
    setActivePage(pageIndex++);
    setSkip(pageIndex++ * take);
  }

  useEffect(() => {
    console.log(ticketPages)
  }, [ticketPages]);

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

      <Paper className="flex w-full flex-col px-8 py-6 items-center gap-4 mt-10 justify-center">

        <Box className="w-full items-center flex mb-8 justify-center">
          <Typography variant='h4' component='h1' className="underLine">
            Project Tickets
          </Typography>
        </Box>

        {ticketPages.length > 0 && tickets.length > 0 ? (
          <>
            {tickets.map((ticket, index) => (
              <Paper key={index} className="w-full bg-slate-100 flex px-6 py-4 gap-4 flex-col items-start">

                <Box className="flex justify-between w-full items-center">

                  <Box className="flex flex-row gap-8">
                    <Link href={`/tickets/${ticket.id}`}>
                      <Typography className="hover_link" variant="h5">{ticket.title}</Typography>
                    </Link>

                    <Box className="flex flex-row gap-6 items-center">
                      <Typography paragraph >
                        <strong>Priority: </strong> {ticket.priority}
                      </Typography>

                      <Typography paragraph >
                        <strong>Status: </strong> {ticket.status}
                      </Typography>

                      <Typography paragraph >
                        <strong>Type: </strong> {ticket.type}
                      </Typography>

                      <Typography paragraph >
                        <strong>Rate: </strong> {ticket.rate.split("card")[1]}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="px-2 py-1.5 cursor-pointer rounded-full transition-all text-base hover:bg-gray-300 text-gray-700 hover:text-gray-800">
                    <MoreVertOutlinedIcon />
                  </Box>
                </Box>

                <Box className="flex flex-row gap-6">
                  {ticket.completedAt ? (
                    <Box>
                      <strong>Completed At</strong> <time>{moment(ticket.completedAt).format("ll")}</time>
                    </Box>
                  ) : (
                    <Box>
                      <strong>Created At</strong> <time>{moment(ticket.createdAt).format("ll")}</time>
                    </Box>
                  )}

                  <Box className="flex flex-row gap-2">
                    {ticket.tags.length && ticket.tags.map((tag, index) => (
                      <Chip key={index} variant="outlined" label={tag.name} />
                    ))}
                  </Box>
                </Box>

                <Box className="flex flex-row gap-6">
                  <Box className="flex flex-row gap-2">
                    <Typography paragraph >
                      <strong>Assign To</strong>
                    </Typography>
                    <Link href={`/profile/${ticket.developer.id}`}>
                      <Typography paragraph className="link">{ticket.developer.firstName + " " + ticket.developer.lastName}</Typography>
                    </Link>
                  </Box>

                  <Box className="flex flex-row text-base relative p-2 text-gray-700">
                    <span className="absolute top-0 left-0 ">{ticket.comments.length}</span>
                    <InsertCommentOutlinedIcon />
                  </Box>
                </Box>


              </Paper>
            ))}
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="flex items-center">

                {activePage > 0 ? (
                  <li onClick={handelPreviousPage}>
                    <div className="flex py-2 px-3 ml-0 text-gray-500 cursor-pointer bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 ">
                      <span className="sr-only">Previous</span>
                      <NavigateBeforeIcon />
                    </div>
                  </li>
                ) : (
                  <li>
                    <div className="flex py-2 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300">
                      <span className="sr-only">Previous</span>
                      <NavigateBeforeIcon />
                    </div>
                  </li>
                )}

                {ticketPages.map((item: number, index: number) => (
                  <li key={index}>
                    <div onClick={() => handelToPage(index)} className={`py-2 px-3 ${activePage === index ? " text-gray-100 bg-gray-500  hover:bg-gray-600" : "hover:bg-gray-100 text-gray-500 cursor-pointer bg-white "} border border-gray-300  `}>{index + 1}</div>
                  </li>
                ))}

                {activePage < (ticketPages.length - 1) ? (
                  <li onClick={handelNextPage}>
                    <div className="flex py-2 px-3 ml-0 text-gray-500 cursor-pointer bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 ">
                      <span className="sr-only">Next</span>
                      <NavigateNextOutlinedIcon />
                    </div>
                  </li>
                ) : (
                  <li >
                    <div className="flex py-2 px-3 ml-0 text-gray-500 bg-white rounded-r-lg border border-gray-300">
                      <span className="sr-only">Next</span>
                      <NavigateNextOutlinedIcon />
                    </div>
                  </li>
                )}

              </ul>
            </nav>
          </>
        ) : (
          <Typography paragraph>No Ticket Found</Typography>
        )}
      </Paper>
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