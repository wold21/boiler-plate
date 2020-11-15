const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3333;

const { User } = require("./models/User");

// application/x-www-form-urlencoded으로된 형식을 분석해 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 마찬가지로 json을 분석해 가져올 수 있게 한다.
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://tazo:178432@boiler-plate-shard-00-00.daskp.mongodb.net:27017,boiler-plate-shard-00-01.daskp.mongodb.net:27017,boiler-plate-shard-00-02.daskp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-sj3s3q-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(`mongoDB Not Connected ${err}`));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // register info for DB
  // 회원가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
