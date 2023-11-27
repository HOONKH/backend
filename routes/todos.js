const express = require("express");

const router = express.Router();
// 라우터에서 익스프레스 라우터를 받아줌
let todoId = 1;
let todos = [{ id: 1, title: "🥞팬케익먹기", isDone: false }];
// 더미데이터로변수로 만들어놓기

router.post("/", (req, res) => {
  const { title } = req.body;
  // 구조분해 문법 => req.body.title => title로 짧게 쓸수있음
  if (!title) {
    return res.status(400).json({
      message: "Not exist title",
    });
    // status 에러메시지
  }

  todoId++;
  // todoId = todoId +1 ; todoId+=1 이렇게 같음.
  const newTodo = { id: todoId, title, isDone: false };

  todos.push(newTodo);

  console.log(todos);

  return res.json({ todo: newTodo });
});
// todos 현재 경로이기 때문에 '/'
//  응답은 return으로

module.exports = router;
// export와 같음
