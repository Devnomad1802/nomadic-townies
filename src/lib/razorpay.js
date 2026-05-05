// ⚠️ For production, you MUST verify payments server-side using your Razorpay
// secret key + signature. The current setup is client-only and suitable for
// MVP testing. Before going live with real money, add an order-creation
// endpoint that hits Razorpay's /v1/orders API and returns an order_id, and
// add a /verify endpoint that validates razorpay_signature.
// Docs: https://razorpay.com/docs/payments/server-integration/nodejs/

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_REPLACE_ME';

/**
 * Opens Razorpay checkout for a trip booking.
 * @param {Object} params
 * @param {Object} params.trip - The trip object from TRIPS
 * @param {Object} params.customer - { name, email, phone, notes }
 * @param {'full'|'advance'} params.paymentType
 * @param {Function} params.onSuccess - (response) => void
 * @param {Function} params.onDismiss - () => void
 * @param {Function} params.onError - (err) => void
 */
export function openRazorpayCheckout({ trip, customer, paymentType, onSuccess, onDismiss, onError }) {
  if (typeof window.Razorpay === 'undefined') {
    onError(new Error('Razorpay SDK failed to load. Refresh and try again.'));
    return;
  }

  const amount = paymentType === 'full' ? trip.price : trip.advance;

  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // paise
    currency: 'INR',
    name: 'Nomadic Townies',
    description: `${trip.name} (${paymentType === 'full' ? 'Full payment' : 'Advance booking'})`,
    image: '/logo.png',
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name: customer.name,
      email: customer.email,
      contact: customer.phone,
    },
    notes: {
      trip_slug: trip.slug,
      trip_name: trip.name,
      payment_type: paymentType,
      customer_notes: customer.notes || '',
      departure_date: trip.departureDate,
    },
    theme: { color: '#D44424' },
    modal: { ondismiss: onDismiss },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', (resp) => onError(resp.error));
  rzp.open();
}
