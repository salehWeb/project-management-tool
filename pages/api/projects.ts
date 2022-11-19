import { GetUserIdAndRoleMiddleware } from './../../middleware/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

        const { error, id, role } = GetUserIdAndRoleMiddleware(req);
        if (error) return res.status(400).json({ error });
        if (!id) return res.status(404).json({ massage: "user not found" });


        if (req.query["get-length"]) {
            if (role === "ADMIN") {
                const length = await prisma.project.count();
                return res.status(200).json({ length })
            } else if (role === "PROJECT_MANAGER") {
                const length = await prisma.project.count({where: { projectMangerId: id }});
                return res.status(200).json({ length })
            } else {
                return res.status(200).json({ length: 0 })
            }
        }

        if (req.query["get-projects-status"]) {


            if (role === "ADMIN") {
                const projects = await prisma.project.findMany({ select: { isClosed: true } });
                return res.status(200).json({ projects })

            } else if (role === "PROJECT_MANAGER") {

                const projects = await prisma.project.findMany({ where: { projectMangerId: id }, select: { isClosed: true } });
                return res.status(200).json({ projects })

            } else {
                return res.status(403).json({ massage: "UnAuthorized To Access Projects"})
            }
        }


        const skip = Number(req.query["skip"]);
        const take = Number(req.query["take"]);
        
        if (typeof skip !== "number") return res.status(404).json({ massage: "skip is not a number" });
        if (typeof take !== "number") return res.status(404).json({ massage: "take is not a number" });

        switch (role) {
            case 'ADMIN': {

                const projects = await prisma.project.findMany({
                    skip: skip,
                    take: take,
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        createdAt: true,
                        isClosed: true,
                        projectManger: {
                            select: {
                                firstName: true,
                                lastName: true,
                                id: true,
                            }
                        },
                    },
                });

                return res.status(200).json({ projects });

            }

            case "PROJECT_MANAGER": {

                const projects = await prisma.project.findMany({
                    where: {
                        projectMangerId: id,
                    },
                    skip: skip,
                    take: take,
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        createdAt: true,
                        isClosed: true,
                        projectManger: {
                            select: {
                                firstName: true,
                                lastName: true,
                                id: true,
                            }
                        },
                    },
                });

                return res.status(200).json({ projects });
            }

            case "DEVELOPER": {
                return res.status(200).json({ massage: "No Project Found" })
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