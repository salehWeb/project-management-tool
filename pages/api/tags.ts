import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const tags = await prisma.tag.findMany({ select: { name: true } });

        return res.status(200).json({ tags });
    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {

    }
};