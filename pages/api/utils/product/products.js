import db from "models";

export default async function handler(req, res) {
  const products = await db.Product.findAndCountAll({
    order: [
      ['id', 'ASC'],
    ],
    include: [{
      model: db.File
    }, db.Color, db.Metal, db.Locket]
  });
  res.statusCode = 200;
  res.json({ products: products })
}
