const { Customer, Product } = require("../models");
const { Op } = require("sequelize");
class mainController {
  static async fetchProduct(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 12;
      const filterParam = req.query.filter;

      const filter = filterParam
        ? {
            name: {
              [Op.iLike]: `%${filterParam}%`,
            },
            status: "Active",
          }
        : { status: "Active" };

      const offset = (page - 1) * pageSize;
      const data = await Product.findAndCountAll({
        offset,
        limit: pageSize,
        where: filter,
      });

      const totalPages = Math.ceil(data.count / pageSize);
      const response = {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount: data.count,
        data: data.rows,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async fetchProductById(req,res,next){
    try {
      const {id} = req.params

      const data  = await Product.findByPk(id)

      if(!data){
        throw{name:"Product not found"}
      }
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = mainController;
