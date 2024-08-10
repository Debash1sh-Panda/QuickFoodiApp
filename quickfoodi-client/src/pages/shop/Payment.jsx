import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRPE_API_KEY)
function Payment() {
  const [cart] = useCart()
  // console.log(cart)

  // calculate the checkout prices
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const toalPrice = parseFloat(cartTotal.toFixed(2));
  // console.log(toalPrice)

  return (
    <div className="section-container min-h-0 bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%">
      <div className="sm:py-32 py-16 flex flex-col justify-between items-center gap-8">
        <div className="flex items-center justify-center space-y-7 px-3 order-2 md:order-1">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
           Details of Your {" "}
            <span className="text-[#164A41] font-bold">PAYMENT</span>
          </h2>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm price={toalPrice} cart={cart}/>
      </Elements>
    </div>
  );
}

export default Payment;
