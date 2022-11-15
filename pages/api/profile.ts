import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';
import { GetUserIdMiddleware } from '../../middleware';
import { IUpdateProfileGeneralInformation } from '../../types/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const { error, id } = GetUserIdMiddleware(req);

        if (error) return res.status(400).json({ massage: error });
        if (!id) return res.status(404).json({ massage: "User Not Found" });

        const userProfile = await prisma.user.findUnique({
            where: {
                id: id,
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

        return res.status(200).json({ userProfile })
    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {
        const { error, id } = GetUserIdMiddleware(req);
        const data: IUpdateProfileGeneralInformation = req.body;

        if (error) return res.status(400).json({ massage: error });
        if (!id) return res.status(404).json({ massage: "User Not Found" });

        if (!data.firstName || !data.lastName || !data.email)
            return res.status(400).json({ massage: "Bad Request InValid Data" });

        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                title: data.title || "",
                about: data.about || "",
            },
        })

        return res.status(200).json({ massage: "SuccessFully Updated User Profile"});
    }
};