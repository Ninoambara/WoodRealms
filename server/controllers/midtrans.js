const { Customer, Product, CustomerProduct } = require("../models");
const midtransClient = require('midtrans-client');

class MidtransHandle {
  static async midtransGenerate(req, res, next) {
    // let price = req.body.totalPrice || 100000
    try {
      const data = await CustomerProduct.findAll({
        where: {
          CustomerId: req.user.id,
        },
        include: ["Product"],
      });

      let totalPrice = 0;

      data.forEach((customerProduct) => {
        const product = customerProduct.Product;
        totalPrice += product.price;
      });

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-VBnvQtDSQ7vRrvvdh6yMVLE5",
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(10000000 + Math.random() * 90000000),
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        }, 
      };

     const midTransToken = await snap.createTransaction(parameter)

    res.status(201).json(midTransToken.redirect_url)
    
    await CustomerProduct.destroy({
        where: {
          CustomerId: req.user.id,
        },
      });
    } catch (error) {
        next(error)
    }
  }
}

module.exports = MidtransHandle
