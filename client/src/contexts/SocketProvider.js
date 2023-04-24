import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()   

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {  // tells react that component needs to do something after rendering
    const newSocket = io(
      'http://localhost:5000',
      { query: { id } }
    )                // directly updating dom , fetching data // sath sath updates 
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return ( // real time communication bw browser and node js server 
    <SocketContext.Provider value={socket}>  
      {children}
    </SocketContext.Provider>
  )
}
