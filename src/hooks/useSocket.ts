import { SocketContext } from '@/contexts/socketContext'
import { useContext, useEffect, useState } from 'react'

export const useSocket = (id: string) => {
  const { socket } = useContext(SocketContext)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('connected')
      socket?.emit('subscribe', {
        roomId: id,
        socketId: socket.id,
      })
      setConnected(true)
    })
  }, [socket, id])
  return {
    connected,
  }
}
