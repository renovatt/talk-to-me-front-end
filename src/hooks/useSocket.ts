import { SocketContext } from '@/contexts/socketContext'
import { useContext, useEffect } from 'react'

export const useSocket = (id: string) => {
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('connected')
      socket?.emit('subscribe', {
        roomId: id,
        socketId: socket.id,
      })
    })
  }, [socket, id])
}
