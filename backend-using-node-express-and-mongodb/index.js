require("dotenv").config();

const express = require("express");
const app = express();
const authRouter = require("./src/routes/auth-route");
const productRouter = require("./src/routes/product-route")
const customerAuthRouter = require("./src/routes/customer-route-auth")
const connectDb = require("./src/Database/dbConn");
const errorMiddleware = require("./src/Middleware/error-middleware");
const cors = require("cors");

// Middleware
app.use(express.json());
//use cors to allow cross origin resource sharing
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(
  corsOptions
));

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRouter);
app.use("/api/product",productRouter);
app.use("/api/customer", customerAuthRouter)
app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
