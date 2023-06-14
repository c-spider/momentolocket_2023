import db from "models";
import Backend from "backend"

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        let u = await Backend.getAuthenticatedUser({req, res});
        if(!u) {
          res.statusCode = 401
          return res.json({ error: "Unauthorized User 1" })
        }
  
        if(u.token != req.body.token) {
          await Backend.signout({req, res});
          res.statusCode = 401
          return res.json({ error: "Unauthorized User 2" })
        }
  
        if(u.verificationCode == "") {
        res.statusCode = 401
          return res.json({ error: "Email not verified." })
        }
  
        const user = await db.User.findByPk(u.id)
  
        res.statusCode = 200
        res.json({
          logedIn: true,
          id: u.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          role: user.role,
          country: user.country,
          state: user.state,
          city: user.city,
          apartment: user.apartment,
          address: user.address,
          zipcode: user.zipcode,
          avatar: user.avatar,
          status: user.status,
          authToken: u.token,
          isVerified: u.verificationCode ? false : true
        })
      } catch(e) {
          res.statusCode = 401
          return res.json({ error: "Unauthorized User 3" })
      }
      
    } else {
      res.json({ error: "method_not_allowed" })
    }
  }
  