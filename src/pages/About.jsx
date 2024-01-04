import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { buildApiEndpoint, getCookie } from "../utils"
import { PaymentButton } from '../components';


const token = getCookie('token');
const stripePromise = loadStripe('pk_test_51NoiuxA0Wdj6YMZbxZ2YpHpr4GoYnqHrZSm1MURYmtu2Tdl2odtp4kPNdIDfyt7maFJwMYPAFJhqhUrFdhxnfkTG00i36KyXhA');

const About = () => {
   const [clientSecret, setClientSecret] = useState("");

   const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post( buildApiEndpoint(`/stripe/payment-intent`),
        
        {
          amount: 1000, // Replace with the desired amount
          currency: 'usd', // Replace with the desired currency
          // Add other required fields if necessary
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
        )

        // Access the response data
        setClientSecret(data.clientSecret)
        console.log(data);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
  <>
  {
    stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={options}>
      <PaymentButton />
      </Elements>
    )
  }
  </>
  )
}

export default About