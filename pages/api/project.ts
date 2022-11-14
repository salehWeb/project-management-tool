import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';
import { GetUserIdAndRoleMiddleware } from '../../middleware';
import { ICreateProject } from '../../types/project';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

    }

    if (req.method === 'POST') {



        try {
            const {error, id, role} = GetUserIdAndRoleMiddleware(req);
            
            if (error) return res.status(400).json({error});
            if (!id) return res.status(404).json({massage: "user not found"});
            if (role !== "ADMIN") return res.status(403).json({massage: "UnAuthorized" });

            const data: ICreateProject = req.body;

            if (!data.projectMangerId || data.title.length < 8 || data.description.length < 20) 
            return res.status(400).json({massage: "UnValid Project Data"});

            const isUserFound = await prisma.user.findUnique({
                where: {
                    id: data.projectMangerId
                },
                select: {
                    id: true,
                }
            });
    
            if (!isUserFound?.id) return res.status(400).json({massage: "Project Manger Not Found"});

            await prisma.project.create({
                data: {
                    title: data.title,
                    description: data.description,
                    projectMangerId: data.projectMangerId
                }
            })

            return res.status(200).json({massage: "Project Created Successfully"});

        } catch (error) {
            return res.status(500).json({ error })
        }
    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {

    }
};