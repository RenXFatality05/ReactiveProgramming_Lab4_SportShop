const jwt = require("jsonwebtoken");

const APP_SECRET = "sportshop-local-demo";
const USERNAME = "admin";
const PASSWORD = "secret";

module.exports = function (req, res, next) {
  const [resource, id] = req.path.toLowerCase().split("/").filter(Boolean);

  if (resource === "login" && !id && req.method === "POST") {
    const { name, password } = req.body ?? {};

    if (name !== USERNAME || password !== PASSWORD) {
      return res.status(401).json({ success: false });
    }

    const token = jwt.sign({ sub: USERNAME }, APP_SECRET, {
      expiresIn: "1h"
    });

    return res.json({ success: true, token });
  }

  const isRead = ["GET", "HEAD", "OPTIONS"].includes(req.method);
  const isCatalog = ["products", "categories"].includes(resource);
  const isNewOrder = req.method === "POST" && !id;
  const requiresAuth =
    resource === "db" ||
    (isCatalog && !isRead) ||
    (resource === "orders" && !isNewOrder);

  if (!requiresAuth) {
    return next();
  }

  const token = req.headers.authorization?.match(/^Bearer (\S+)$/i)?.[1];

  try {
    jwt.verify(token, APP_SECRET, { algorithms: ["HS256"] });
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};