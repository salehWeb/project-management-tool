import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma';
import { GetUserIdMiddleware } from '../../../middleware';
import { IChangePassword } from '../../../types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {
        const data: IChangePassword = req.body;
        console.log(data)
        try {
            if (!data.currentPassword || !data.newPassword) return res.status(400).json({ massage: "Password Not Found"});

            const { error, id } = GetUserIdMiddleware(req);
            if (error) return res.status(400).json({ massage: error });
            if (!id) return res.status(404).json({massage: "User Not Found"});

            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    password: true,
                },
            })

            if (!user) return res.status(404).json({ massage: "user Not Found" });

            const isMatch = compareSync(data.currentPassword, user.password)

            if (!isMatch) return res.status(400).json({ massage: `password is incorrect` })

            const salt = genSaltSync(10);
            const hashPassword = hashSync(data.newPassword, salt)

            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    password: hashPassword,
                },
            })

            return res.status(200).json({ massage: 'Success' });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
};