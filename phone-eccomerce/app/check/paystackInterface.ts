export const handlePayment = (email: any, amount: number) => {
  const handler = PaystackPop.setup({
    key: 'pk_test_cbdbef83d1ee1286e06785b2dc77986078a65123',
    email,
    amount: amount * 100,

    onClose: () => {
      window.location = '/payment/error';
    },
    callback: function (response: { reference: string }) {
      window.location = '/payment/info?reference=' + response.reference;
    },
  });
  handler.openIframe();
};
