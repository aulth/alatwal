const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function getStatus(req, res) {
  console.log(req.body)
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(
    sessionId
  );
  console.log(session)
  if(session){
    res.json({success:true, session:session });
  }
}

export default getStatus;