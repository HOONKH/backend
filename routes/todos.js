const express = require("express");

const router = express.Router();
// 라우터에서 익스프레스 라우터를 받아줌 임포트
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

  return res.json({ todo: newTodo }); // appthunk의 creatTodo로 감
});
// todos 현재 경로이기 때문에 '/'
//  응답은 return으로
router.get("/", (req, res) => {
  return res.json({ todos });
});

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  let existTodo;

  todos.map((v) => {
    if (v.id === +todoId) {
      existTodo = v;
    }
  });
  // 리턴은 새로운 배열을 만들어 쓰는것
  // 리턴을 뺴는것은 새로운 배열을 안만드는것
  if (!existTodo) {
    return res.status(400).json({
      message: "Not exist todo",
    });
  }

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  let updateTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });
  if (!updateTodo) {
    return res.status(400).json({
      message: "Not exist todo",
    });
  }
  return res.json({ todo: updateTodo });
});

router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (isNaN(todoId) || !title) {
    return res.status(400).json({
      message: "Not exist data",
    });
  }
  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title, isDone: v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  console.log(todos);
  return res.json({ todo: updateTodo });
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v;
    }
  });
  console.log(todos);
  return res.json({ message: "deleted todos" });
});
module.exports = router;
// export default와 같음
