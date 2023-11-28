const express = require("express");
const todosRouter = require("./routes/todos");
const cors = require("cors");
// 리액트와 같이 임포트 하는 방법

const app = express();

const port = 3010;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    // cors 설정
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 바디 파서.json형식으로  **필수
// extended true 는 json 형식과 똑같이 받기위해
app.use("/todos", todosRouter);
// listen 밑으로 가지 않기 경로 /todos 로 임포트한 라우터도 같이
app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`🍕 Server is listening on port : ${port}`);
});
