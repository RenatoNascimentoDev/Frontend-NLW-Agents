import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsApiResponse = Array<{
  id: string
  name: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsApiResponse = await response.json()

      return result
    },
  })

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col gap-1">
        {data?.map((room) => (
          <Link key={room.id}  to={`/room/${room.id}`}>
            {room.name}
          </Link>
        ))}
      </div>

      <Link className="underline" to="/room">
        Acessar a sala
      </Link>
    </div>
  )
}
