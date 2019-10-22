import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // dollar = cent * 100
  const publishableKey = 'pk_test_hgfrwtA9acVu5LYCKnjF5AXK00WUgnnyoS';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful');
  };
  return (
    <StripeCheckout
      label='Pay Now'
      name='MiniKuper Shopping Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
