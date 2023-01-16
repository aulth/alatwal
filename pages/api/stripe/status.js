const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function getStatus(req, res) {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(
    sessionId
  );
  if(session){
    res.json({success:true, session:session });
  }
}

export default getStatus;