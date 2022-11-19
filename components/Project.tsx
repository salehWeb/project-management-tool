import React from 'react'
import { IProject } from '../types/project';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import Link from 'next/link';
import moment from 'moment';

interface IProjectPageProps {
    project: IProject
}

const Project = ({ project }: IProjectPageProps) => {
    return (
        <Paper className="w-full bg-slate-100 flex px-6 py-4 gap-4 flex-col items-start">

            <Box className="flex justify-between w-full items-center">

                <Box className="flex flex-row gap-8">
                    <Link href={`/projects/${project.id}`}>
                        <Typography className="hover_link" variant="h5">{project.title}</Typography>
                    </Link>

                    <Box className="flex flex-row gap-6 items-center">
                        <Typography paragraph >
                            <strong>Status: </strong> {project.isClosed ? 'closed' : 'open'}
                        </Typography>
                    </Box>
                </Box>

                <Box className="px-2 py-1.5 cursor-pointer rounded-full transition-all text-base hover:bg-gray-300 text-gray-700 hover:text-gray-800">
                    <MoreVertOutlinedIcon />
                </Box>
            </Box>

            <Box className="flex flex-row gap-6">
                <Box>
                    <strong>Created At</strong> <time>{moment(project.createdAt).format("ll")}</time>
                </Box>
            </Box>

            <Box className="flex flex-row gap-6">
                <Box className="flex flex-row gap-2">
                    <Typography paragraph >
                        <strong>Project Manger</strong>
                    </Typography>
                    <Link href={`/profile/${project.projectManger.id}`}>
                        <Typography paragraph className="link">{project.projectManger.firstName + " " + project.projectManger.lastName}</Typography>
                    </Link>
                </Box>
            </Box>

        </Paper>
    )
}

export default Project;