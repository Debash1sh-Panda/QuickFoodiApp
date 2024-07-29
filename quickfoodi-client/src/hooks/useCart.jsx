import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

function useCart() {

  const {user} = useAuth();
  const token = localStorage.getItem('token');

  const {refetch, data:cart = []} = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/cart?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      // console.log(res)
      return res.json();
    }
  })

  return [cart, refetch]
}

export default useCart