import { useState, useEffect, useCallback } from 'react'
import { IRate, ITicketPriority, ITicketStatus, ITicketTypes } from '../types/ticket';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getTicketsForProjectPage, getTicketsLengthForProjectPage } from '../api';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Ticket from './Ticket';
import { useRouter } from 'next/router';

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

const Tickets = ({ projectId }: { projectId: number }) => {

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    const [ticketPages, setTicketPages] = useState<number[]>([]);
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [activePage, setActivePage] = useState(0)

    const init = useCallback(async () => {
        await getTicketsLengthForProjectPage(projectId)
            .then((res) => {
                const pages = [];
                for (let i = 0; i < Math.ceil(res.data.length / take); i++) { pages.push(i) };
                setTicketPages(pages);
            })
            .catch((err) => { console.error(err) });

    }, [projectId, take])

    const getTicketPagination = useCallback(async () => {
        await getTicketsForProjectPage(projectId, skip, take)
            .then((res) => { setTickets(res.data.tickets) })
            .catch((err) => { console.log(err) });
    }, [projectId, skip, take])

    useEffect(() => {
        getTicketPagination()
    }, [getTicketPagination])

    useEffect(() => {
        init()
    }, [init])



    useEffect(() => {
        console.log(ticketPages)
    }, [ticketPages]);

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

    return (
        <Paper className="flex w-full flex-col px-8 py-6 items-center gap-4 mt-10 justify-center">

            <Box className="w-full items-center flex mb-8 justify-center">
                <Typography variant='h4' component='h1' className="underLine">
                    Project Tickets
                </Typography>
            </Box>

            {ticketPages.length > 0 && tickets.length > 0 ? (
                <>
                    {tickets.map((ticket, index) => (
                        <Ticket ticket={ticket} key={index} />
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
    )
}

export default Tickets