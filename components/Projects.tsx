import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getMyProjects, getProjectsLength } from '../api';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Project from './Project';
import { useRouter } from 'next/router';
import { IProject } from '../types/project';

const Projects = () => {

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    const [projectPages, setProjectPages] = useState<number[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [activePage, setActivePage] = useState(0)

    const init = useCallback(async () => {
        await getProjectsLength()
            .then((res) => {
                const pages = [];
                for (let i = 0; i < Math.ceil(res.data.length / take); i++) { pages.push(i) };
                setProjectPages(pages);
            })
            .catch((err) => { console.error(err) });

    }, [take])

    const getProjectsPagination = useCallback(async () => {
        await getMyProjects(skip, take)
            .then((res) => { setProjects(res.data.projects) })
            .catch((err) => { console.log(err) });
    }, [skip, take])

    useEffect(() => {
        getProjectsPagination()
    }, [getProjectsPagination])

    useEffect(() => {
        init()
    }, [init])

    useEffect(() => {
        console.log(projectPages)
    }, [projectPages]);

    const handelNextPage = () => {
        const page = (activePage + 1);
        if (activePage < (projectPages.length - 1)) setActivePage(page);
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
                    Projects 
                </Typography>
            </Box>

            {projectPages.length > 0 && projects.length > 0 ? (
                <>
                    {projects.map((project, index) => (
                        <Project project={project} key={index} />
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

                            {projectPages.map((item: number, index: number) => (
                                <li key={index}>
                                    <div onClick={() => handelToPage(index)} className={`py-2 px-3 ${activePage === index ? " text-gray-100 bg-gray-500  hover:bg-gray-600" : "hover:bg-gray-100 text-gray-500 cursor-pointer bg-white "} border border-gray-300  `}>{index + 1}</div>
                                </li>
                            ))}

                            {activePage < (projectPages.length - 1) ? (
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

export default Projects