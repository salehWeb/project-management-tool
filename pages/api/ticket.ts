import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';
import { GetUserIdAndRoleMiddleware } from '../../middleware';
import { ICreateTicket } from '../../types/ticket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
    const typeOptions = ["FEATURE", "BUG"];
    const rateOptions = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10"];

    if (req.method === 'POST') {
        try {
            const TagsQuery = [];
            const projectId: number = Number(req.query["projectId"]);
            const data: ICreateTicket = req.body;
    
            if (typeof Number(projectId) !== 'number') return res.status(404).json({ massage: "Project Not Found" });
    
            const { error, id, role } = GetUserIdAndRoleMiddleware(req)
    
            if (error) return res.status(400).json({ massage: error });
    
            if (typeof Number(id) !== 'number') return res.status(404).json({ massage: "User Not Found" });
    
            if (!(role === ("ADMIN" || "PROJECT_MANAGER"))) return res.status(403).json({ massage: "UnAuthorized To Create Ticket" });
    
            if (
                (!data?.description || data?.description?.length < 20)
                || (!data?.title || data?.title?.length < 8)
                || (!data?.tags || data?.tags?.length < 2 || data?.tags?.length > 4 )
                || (typeof Number(data?.developerId) !== 'number')
                || (!data?.priority || !priorityOptions.includes(data?.priority))
                || (!data?.type || !typeOptions.includes(data?.type))
                || (!data?.rate || !rateOptions.includes(data?.rate))
            )
                return res.status(400).json({ massage: "UnValid Ticket Data" });
    
            for (let tag of data.tags) { TagsQuery.push({ where: { name: tag }, create: { name: tag } }) };
    
            if (role === "ADMIN") {
                const project = await prisma.ticket.create({
                    data: {
                        description: data.description,
                        developerId: data.developerId,
                        projectId: projectId,
                        title: data.title,
                        tags: {
                            connectOrCreate: TagsQuery,
                        },
                        priority: data.priority,
                        type: data.type,
                        rate: data.rate,
                    }
                });
    
                return res.status(201).json({ massage: "Ticket created", project });
    
            }
            else if (role === "PROJECT_MANAGER") {
    
                const isFound = await prisma.project.findUnique({
                    where: {
                        id: projectId,
                    },
                    select: {
                        projectMangerId: true,
                    },
                })
    
                if (isFound?.projectMangerId !== id) return res.status(403).json({ massage: "You do not have access to this project" });
    
                const project = await prisma.ticket.create({
                    data: {
                        description: data.description,
                        developer: {
                            connect: {
                                id:  data.developerId
                            },
                        },
                        project: {
                            connect: {
                                id: projectId
                            },
                        },
                        title: data.title,
                        tags: {
                            connectOrCreate: TagsQuery,
                        },
                        priority: data.priority,
                        type: data.type,
                        rate: data.rate,
                    }
                });
    
                return res.status(201).json({ massage: "Ticket created", project });
    
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ massage: error });
        }   

    }

};