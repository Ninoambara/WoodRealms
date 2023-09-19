const { Customer, Product, CustomerProduct } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
const generateJWT = require("../helpers/jwtPdf");
const kirimEmail = require("../helpers/nodemailer");

class customerController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const data = await Customer.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }

      const data = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!data) {
        throw { name: "Invalid email/password" };
      }

      const validate = comparePass(password, data.password);

      if (!validate) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: data.id,
      };

      const access_token = signToken(payload);
      res.status(200).json({ access_token, email });
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Product.findByPk(id);

      if (!data) {
        throw { name: "Produt not found" };
      }

      const added = await CustomerProduct.create({
        ProductId: id,
        CustomerId: req.user.id,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  } 

  static async fetchProduct(req, res, next) {
    try {
      const data = await CustomerProduct.findAll({
        where: {
          CustomerId: req.user.id,
        },
        include: ["Product"],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createPdf(req, res, next) {
    try {
      const data = await CustomerProduct.findAll({
        where: {
          CustomerId: req.user.id,
        },
        include: ["Product"],
      });

      const lineItems = data.map((item) => ({
        total_cost: item.Product.price,
        hours: 10,
        fee: item.Product.price,
        description: item.Product.name,
        note: item.Product.description,
      }));

      const pdfData = {
        template: {
          id: 740418,
          data: {
            invoice_number: "4698018857",
            email_id: req.user.email,
            name: req.user.username,
            credit: {
              balance: 0,
            },
            line_items: lineItems,
          },
        },
        format: "pdf",
        output: "url",
        name: "Product List",
      };
      const token = generateJWT();
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const hasil = await axios.post(
        "https://us1.pdfgeneratorapi.com/api/v4/documents/generate",
        pdfData,
        { headers: headers }
      );

      await kirimEmail(req.user.email, hasil.data.response);
      res.status(201).json({message:"successfully generate pdf"})
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const data = await CustomerProduct.findOne({
        where: {
          id,
          CustomerId: req.user.id,
        },
      });

      if (!data) {
        throw { name: "Product not found" };
      }

      if (data.CustomerId !== req.user.id) {
        throw { name: "c" };
      }

      await data.destroy();
      res.status(200).json({message: "product deleted"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;
