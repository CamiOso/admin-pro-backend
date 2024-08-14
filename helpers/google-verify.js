const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_SECRET );


const googleVerify = async( token ) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,  
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];

    console.log(payload);


    return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = {
    googleVerify
}