import { GetUserIdAndRoleMiddleware } from './../../middleware/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

        const {error, id, role} = GetUserIdAndRoleMiddleware(req);
        if (error) return res.status(400).json({error});
        if (!id) return res.status(404).json({massage: "user not found"});

        switch (role) {
            case 'ADMIN': {

                const projects = await prisma.project.findMany({
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        createdAt: true,
                        projectManger: {
                            select: {
                                firstName: true,
                                lastName: true,
                                id: true,
                            }
                        },
                    },
                });
    
                return res.status(200).json({projects});

            }

            case "PROJECT_MANAGER": {

                const projects = await prisma.project.findMany({
                    where: {
                        projectMangerId: id,
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        createdAt: true,
                    },
                });
    
                return res.status(200).json({projects});

            }

            case "DEVELOPER": {
                return res.status(200).json({massage: "No Project Found"})
            }
        }

    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {

    }
};