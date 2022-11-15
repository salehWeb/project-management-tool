import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false
    }
};

interface IFileStream {
    filepath: string;
    originalFilename: string;
}

const ProcessFiles = (Files: any): IFileStream[] => {
    const data: IFileStream[] = [];
    let index = 0;

    while (Boolean(Files[`file${index}`])) {
        data.push(Files[`file${index}`] as IFileStream)
        index++;
    }

    return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const form = new formidable.IncomingForm();

        form.parse(req, async function (err, fields, files) {
            const filesArray = ProcessFiles(files)

            if (filesArray.length === 0) return
            res.status(401).json({ massages: "No File Found" });

            // create 'uploads' folder if not exist
            fs.mkdirSync("./public/uploads", { recursive: true });

            for (let file of filesArray) {
                const data = fs.readFileSync(file.filepath);
                fs.writeFileSync(`./public/uploads/${Date.now().toString() +
                    file.originalFilename}`, data);
                fs.unlinkSync(file.filepath);
            }

        });

        return res.status(200).json({ massage: "Success" });
    }
};
