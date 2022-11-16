import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import prisma from '../../libs/prisma';
import { IUserProfileData } from '../../types/profile';
import moment from 'moment';

interface IProfilePageProps {
    user: IUserProfileData
};

const myLoader = (url: string) => url;

const ProfilePage = ({ user }: IProfilePageProps) => {
    return (
        <Container className='max-w-[100vw] my-10 min-h-[50vh]'>
            <div className="m-4">
                <h1 className='text-3xl text-gray-800 font-bold mb-4'>User Info</h1>
                <div className=' gap-6 grid-flow-dense grid-cols-6 flex-wrap flex flex-col grid-rows-4 lg:grid'>

                    <div className='flex justify-center items-center col-span-6 row-span-4'>
                        <Box className="flex-col gap-5 flex shadow-md p-8 items-start justify-start rounded-md bg-white ">

                            <Box>
                                <div className='max-w-[120px] max-h-[100px] mb-6'>
                                    <Image
                                        className='rounded-md w-auto'
                                        loader={() => myLoader(user?.avatar ? `/uploads/${user?.avatar}` : '/images/user-placeholder.png')}
                                        src={"me.png"}
                                        alt="Picture of the author"
                                        width={120}
                                        height={100}
                                    />
                                </div>

                                <div className='mt-2'>
                                    <h1 className='text-2xl text-gray-800 font-bold'>{user.firstName + " " + user.lastName}</h1>
                                    {user?.title && (<h2 className='text-gray-600'>{user.title}</h2>)}

                                </div>
                            </Box>

                            <Box>

                                <div className=' text-base'>
                                    <Typography component='p'>
                                        Email: {user?.email}
                                    </Typography>
                                </div>

                                <hr className='my-2' />
                                <div className='text-base '>
                                    <Typography component='p'>
                                        {user?.about}
                                    </Typography>
                                </div>

                            </Box>

                            <Box>

                                <div className='text-base '>
                                    <Typography component='p'>
                                        Role: {user.role}
                                    </Typography>
                                </div>
                                <hr className='my-2' />

                                <div className='text-base '>
                                    <Typography component='p'>
                                        Joined At:  <time>{moment(user.createdAt).format("ll")}</time>
                                    </Typography>
                                </div>

                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProfilePage;


interface IPath {
    params: {
        id: string,
    },
}
export async function getStaticPaths() {
    const usersIds = await prisma.user.findMany({
        select: {
            id: true
        },
    });
    let paths: IPath[] = [];

    for (let userId of usersIds) {
        paths.push({ params: { id: userId.id.toString() } });
    }

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }: IPath) {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(params.id),
        },
        select: {
            email: true,
            createdAt: true,
            lastName: true,
            firstName: true,
            role: true,
            avatar: true,
            about: true,
            title: true,
        },
    });

    return {
        props: { user: JSON.parse(JSON.stringify(user)) || null },
    };
}