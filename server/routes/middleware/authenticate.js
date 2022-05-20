const Session = require("../../models/Session");
const { User } = require("../../models/user");

async function authenticate(req, res, next) {
  try {
    let sessionToken;

    if (req.cookies.session) {
      sessionToken = req.cookies.session;
    } else {
      const authHeader = req.headers["authorization"];
      sessionToken = authHeader && authHeader.split(" ")[1];
    }
    console.log(sessionToken);
    if (!sessionToken)
      return res.status(401).json({ message: "Invalid session token." });

    const session = await Session.findOne({ sessionToken: sessionToken });
    if (!session)
      return res.status(401).json({ message: "Invalid session token." });

    const user = await User.findOne({ _id: session.user });
    if (!user)
      return res.status(401).json({ message: "Invalid session token." });

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  authenticate,
};
