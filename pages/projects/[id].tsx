import {useState, useEffect} from 'react'
import CreateTicket from '../../components/CreateTicket';
import prisma from '../../libs/prisma';

const ProjectPage = (props: any) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    console.log(color)
  }, [color])
  console.log(props)

  
  return (
    <div style={{ backgroundColor: `${color}` }} >
      <div>
      ProjectPage
      </div>
      <CreateTicket />
    </div>
  )
}

export default ProjectPage;



interface IPath {
  params: {
    id: string,
  },
}
export async function getStaticPaths() {
  const projectsIds = await prisma.project.findMany({
    select: {
      id: true
    },
  });
  let paths: IPath[] = [];

  for (let projectId of projectsIds) {
    paths.push({ params: { id: projectId.id.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }: IPath) {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      createdAt: true,
      description: true,
      projectManger: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      tickets: {
        select: {
          title: true,
          tags: {
            select: {
              name: true,
            },
          },
          files: {
            select: {
              id: true,
            },
          },
          developer: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
            },
          },
          createdAt: true,
          completedAt: true,
          type: true,
          priority: true,
          status: true,
          comments: {
            select: {
              id: true,
            },
          },
          rate: true,
        },
      },
      isClosed: true,
      title: true,
    },
  });

  return {
    props: { project: JSON.parse(JSON.stringify(project)) || null },
  };
}