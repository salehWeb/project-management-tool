import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import moment from 'moment';
import React from 'react'
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

interface IProps {
    ticket: {
        id: number;
        title: string;
        priority: string;
        status: string;
        type: string;
        rate: string;
        completedAt: Date | null;
        createdAt: Date;
        tags: {
            name: string;
        }[];
        developer: {
            id: number;
            firstName: string;
            lastName: string;
        };
        comments: {
            id: number;
        }[];
    };
}


const Ticket = ({ ticket }: IProps) => {
    return (
        <Paper className="w-full bg-slate-100 flex px-6 py-4 gap-4 flex-col items-start">

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
    )
}

export default Ticket;