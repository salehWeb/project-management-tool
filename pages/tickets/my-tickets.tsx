import React, { useCallback, useEffect, DragEvent, useRef, useState } from 'react'
import { getMyTickets } from '../../api'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Kanban from '../../components/Kanban';
import { IMyTicket } from '../../types/ticket'


const MyTickets = () => {
  const [tickets, setTickets] = useState<IMyTicket[]>([]);

  const init = useCallback(async () => {
    await getMyTickets()
      .then((res) => { setTickets(res.data.tickets) })
      .catch((err) => { console.log(err) })
  }, []);


  useEffect(() => {
    init()
  }, [init]);


  return (
    <>
      <Kanban tickets={tickets}/>
    </>
  )
}

export default MyTickets;