import { GetUserIdMiddleware } from './../../middleware/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const {id, error} = GetUserIdMiddleware(req);

        if (error) return res.status(400).json({error});
        if (!id) return res.status(404).json({massage: "user not found"});

        const tickets = await prisma.ticket.findMany({
            where: {
                developerId: id,
            },
            select: {
                id: true,
                description: true,
                createdAt: true,
                title: true,
                type: true,
                priority: true,
                status: true,
                tags: {
                    select: {
                        name: true,
                    },
                },
                rate: true,
            }
        });

        return res.status(200).json({tickets})
    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {

    }
};