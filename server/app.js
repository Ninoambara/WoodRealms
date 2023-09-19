if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3002;
const midtrans = require("./controllers/midtrans");
const errorHandler = require("./middlewares/errorHandlers");
const mainController = require("./controllers/mainController");
const customerController = require("./controllers/customerController");
const customerAuthentication = require("./middlewares/authentication");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.post("/register", customerController.register);
app.post("/login", customerController.login);
app.get("/product", mainController.fetchProduct);
app.get("/product/:id", mainController.fetchProductById);

app.use(customerAuthentication);
app.post("/generate-midtrans", midtrans.midtransGenerate);
app.post("/myproducts/:id", customerController.addProduct);
app.get("/myproducts", customerController.fetchProduct);
app.get('/generatepdf', customerController.createPdf)
app.delete('/myproducts/:id', customerController.deleteProduct)

app.use(errorHandler);
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
