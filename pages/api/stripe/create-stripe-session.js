const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Booking from '../../../models/Booking'
async function CreateStripeSession(req, res) {
  const { item } = req.body;
  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://tourism-zeta.vercel.app';
  const transformedItem = {
    quantity: item.quantity,
    price_data: {
      currency: 'aed',
      product_data: {
        images: [item.image],
        name: item.name,
        description: item.description,
      },
      unit_amount: item.price * 100,
    },
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '/success'+ '/'+ item.bookingNumber,
    cancel_url: redirectURL + '/failed',
    metadata: {
      images: item.image,
    },
  });
  console.log(session)
  const booking  = await Booking.findOneAndUpdate({bookingNumber:item.bookingNumber}, {
    sessionId:session.id
  })
  if(booking){
    res.json({ id: session.id });
  }
}

export default CreateStripeSession;