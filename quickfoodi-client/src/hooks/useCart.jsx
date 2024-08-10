import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

function useCart() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/cart?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();  // Parse the response as JSON
      return data;  // Return the parsed data
    }
  });

  return [cart, refetch];
}

export default useCart;
