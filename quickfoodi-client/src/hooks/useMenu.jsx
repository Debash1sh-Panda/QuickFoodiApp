import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { baseUrl } from '../urls'

function useMenu() {
     const {data: menu=[], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl}/api/menu`);
            return res.data
        }
     })
  return [menu, loading, refetch]
}

export default useMenu
