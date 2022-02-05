import React,{useEffect,useState} from "react"
import {Route,Switch} from "react-router-dom"
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payment=(props)=>{
    const StripePublicKey="pk_test_51KFIuGSH3YlIfvRhCvn9pPuB3IxuyjOla5KI1IVOIZTSTatUhhFz8VFDRHWyTrqnuL9i23DJEOpelg0YgxvUQcwF00v2jnown9";
    
    const [stripeToken,setStripeToken]=useState(null);

    useEffect(()=>{
        const makeRequest=async ()=>{
            const res=await axios.post("http://localhost:3002/payment",{
                token:stripeToken.id,
                amount:160
            })
            console.log(res);
        }
        if(stripeToken)
        makeRequest();
    },[stripeToken])

    const onToken=(token)=>{
        setStripeToken(token);
    }

    return(
        <div>
            <Switch>
            <Route path="/payment">
                <div>
                    <StripeCheckout
                        name="shoppimart"
                        description="dummy payment"
                        shippingAddress
                        billingAddress
                        amount={160}
                        token={onToken}
                        stripeKey={StripePublicKey}
                    >
                        <button>pay</button>
                    </StripeCheckout>
                </div>
            </Route>
            <Route path="/success">
                <div>
                    <h3>order placed successfully</h3>
                </div>
            </Route>
            </Switch>
        </div>
    )
}

export default Payment;