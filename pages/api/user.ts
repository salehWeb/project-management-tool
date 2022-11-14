import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma';
import { GetUserIdAndRoleMiddleware } from '../../middleware';
import { IMangeUsersRoles } from '../../types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const onlyProjectMangers = req.query["only-project-manger"];

        if (onlyProjectMangers) {

            const users = await prisma.user.findMany({
                where: {
                    role: "PROJECT_MANAGER"
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            });

            return res.status(200).json({ users });

        } else {

            const users = await prisma.user.findMany({
                where: {
                    NOT: [{role: "ADMIN"}]
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                }
            });

            return res.status(200).json({ users });
        }
    }


    if (req.method === 'POST') {

    }


    if (req.method === 'DELETE') {

    }


    if (req.method === 'PATCH') {
        const { error, id, role } = GetUserIdAndRoleMiddleware(req);
        if (error) return res.status(400).json({error});
        if (!id) return res.status(404).json({massage: "user not found"});
        if (role !== "ADMIN") return res.status(403).json({massage: "UnAuthorized" });

        const data: IMangeUsersRoles = req.body;
        
        if (!(data.role === "PROJECT_MANAGER" || data.role === "USER" || data.role === "DEVELOPER"))  
        return res.status(403).json({massage: "unValid role type" });

        if (data?.usersIds.length === 0) return res.status(404).json({massage: "Users not found"})

        await prisma.user.updateMany({
            where: {
                id: {in: data.usersIds},
            },
            data: {
                role: data.role,
            },
        })

        return res.status(200).json({ massage: "Successfully Update Role" });
    }
};

