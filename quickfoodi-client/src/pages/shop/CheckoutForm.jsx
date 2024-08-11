import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../urls";

function CheckoutForm({ price, cart }) {
  const { user } = useAuth();
  // console.log(cart)
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (typeof price !== "number" || price < 1) {
    //   toast.error("Price is not a number pr less than 1");
    //   return;
    // }
    axios
      .post(`${baseUrl}/api/create-payment-intent`, { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error("not Completed, try again", error);
    } else {
      toast.success("Payment On the Way");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "anonymous",
            email: user.email || "unknown",
          },
        },
      });
      if (confirmError) {
        console.log(confirmError)
      }

      if(paymentIntent.status === 'succeeded'){
        toast.success(`your transaction is ${paymentIntent.id}`)

        const paymentInfo = {
          email: user.email,
          transitionId: paymentIntent.id,
          price,
          quantity: cart.length,
          status: "order pending",
          itemName: cart.map(item => item.name),
          cartItems: cart.map(item => item._id),
          menuItems: cart.map(item => item.menuItemId),
        }

        axios.post(`${baseUrl}/api/payments`, paymentInfo)
        .then(res => {
          console.log(res.data)
          toast.success("Payment Successfull :)");
          navigate('/orders')
        })
      }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 ">
      {/* left */}
      <div className="md:w-1/2 sm:mb-32 ml-14 sm:mt-24">
        <h1 className="text-2xl font-serif text-[#cfd353] mb-3">
          Order Summary
        </h1>
        <h3>Total Price: {price}</h3>
        <h3>Number of Items: {cart.length}</h3>
      </div>

      {/* right */}

      <div className="relative md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl shadow-green-400 bg-base-100 px-4 py-8 mb-20 animate-slideUpFadeIn">
        <span className="absolute top-2 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-90"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600 "></span>
        </span>
        <h4 className="text-lg font-semibold">Process your Payment</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        {/* Stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#1acfdc",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full btn btn-sm mt-6 bg-orange text-white"
          >
            Pay
          </button>

          <div className="mt-5 text-center">
            <button
              type="submit"
              className="btn btn-sm mt-4 bg-blue-300 text-white"
            >
              <FaPaypal className="text-blue-600" /> Pay with Paypal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
