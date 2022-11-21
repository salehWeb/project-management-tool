import React, { useCallback, useEffect, DragEvent, useRef, useState } from 'react'
import { getMyTickets } from '../../api'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Kanban from '../../components/Kanban';

const MyTickets = () => {
  // const MainRef = useRef<HTMLDivElement>(null)
  // const [dragSrc, setDragSrc] = useState<EventTarget | null>(null)
  const init = useCallback(async () => {
    await getMyTickets()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }, []);

  useEffect(() => {
    init()
  }, [init]);

  // const FirstArray = ["helle1", "What is Your Name", "Go PLay Away", "Place Do It Now"]
  // const SecondArray = ["helle2", "What Do You Want"]
  // const ThirdArray = ["helle3", "Can I Kill You", "Can I Kill Your Mom"]


  // const HandelDragStart = (e: DragEvent<HTMLDivElement>) => {
  //   //@ts-ignore
  //   e.target.className = e.target.className + " " + "opacity-40"

  //   setDragSrc(e.target);

  //   e.dataTransfer.effectAllowed = 'move';
  //   //@ts-ignore
  //   e.dataTransfer.setData('text/html', e.target.innerHTML);
  // }

  // const HandelDragEnd = (e: DragEvent<HTMLDivElement>) => {
  //   //@ts-ignore
  //   e.target.className = e.target.className.split(" opacity-40")[0];
  // }

  // const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   return false;
  // }

  // const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
  //   //@ts-ignore
  //   e.target.className = e.target.className + " " + "border-[3px] border-dotted border-[#666]";
  // }

  // const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
  //   //@ts-ignore
  //   e.target.className = e.target.className.split(" border-[3px] border-dotted border-[#666]")[0];
  // }

  // const handleDrop = (e: DragEvent<HTMLDivElement>) => {
  //   e.stopPropagation();

  //   if (dragSrc !== e.target) {
  //     //@ts-ignore
  //     console.log(dragSrc.innerHTML)
  //     console.log(e.target.innerHTML)
  //     console.log(e.dataTransfer.getData('text/html'))
  //     dragSrc.innerHTML = e.target.innerHTML;
  //     //@ts-ignore
  //     e.target.innerHTML = e.dataTransfer.getData('text/html');

  //   }

  //   return false;
  // }


  return (
    <>

      {/* <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-4 flex-col">
        <Typography variant="h5">FirstArray</Typography>
        <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-1 flex-col">
          {FirstArray.map((item, index) => (
            <Card draggable="true" id={`FirstArray${index}`}
              className="cursor-move "
              onDragStart={(e) => HandelDragStart(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragEnd={(e) => HandelDragEnd(e)}
              onDrop={(e) => handleDrop(e)}
              key={index}>{item}</Card>
          ))}
        </Box>
      </Box>

      <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-4 flex-col">
        <Typography variant="h5">SecondArray</Typography>
        <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-1 flex-col">
          {SecondArray.map((item, index) => (
            <Card draggable="true" id={`SecondArray${index}`}
              className="cursor-move"
              onDragStart={(e) => HandelDragStart(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragEnd={(e) => HandelDragEnd(e)}
              onDrop={(e) => handleDrop(e)}
              key={index}>{item}</Card>
          ))}
        </Box>

      </Box>

      <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-4 flex-col">
        <Typography variant="h5">ThirdArray</Typography>
        <Box className="flex p-2 items-center border border-blue-600 rounded-md shadow-xl justify-center gap-1 flex-col">
          {ThirdArray.map((item, index) => (
            <Card draggable="true" id={`ThirdArray${index}`}
              className="cursor-move"
              onDragStart={(e) => HandelDragStart(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragEnd={(e) => HandelDragEnd(e)}
              onDrop={(e) => handleDrop(e)}
              key={index}>{item}</Card>
          ))}
        </Box>

      </Box> */}

      <Kanban />
    </>
  )
}

export default MyTickets