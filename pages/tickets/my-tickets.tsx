import React, { useCallback, useEffect } from 'react'
import { getMyTickets } from '../../api'

const MyTickets = () => {

  const init = useCallback( async () => { 
    await getMyTickets()
          .then((res) => { console.log(res) })
          .catch((err) => { console.log(err) })
  }, []);

  useEffect(() => {
    init()
  }, [init]);


  return (
    <div></div>
  )
}

export default MyTickets