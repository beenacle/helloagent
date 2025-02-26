export function paymentMethod() {

  const addPaymentBtn = document.querySelector('.add-payment-method-btn');
    const newPaymentMethod = document.querySelector('.add-new-payment-method');
  
    if (addPaymentBtn && newPaymentMethod) {
      addPaymentBtn.addEventListener("click", function () {
        addPaymentBtn.classList.add('hidden');
        newPaymentMethod.classList.remove('hidden');
      });
    }

}