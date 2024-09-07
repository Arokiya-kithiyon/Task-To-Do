import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { inputContext } from "./hook/inputContext";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

function TaskForm({ setTask }) {
  const { input, setInput } = useContext(inputContext);

  const updateTask = () => {
    fetch(
      `https://66db2191f47a05d55be72995.mockapi.io/todo/articles/task/${input.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input.text,
          completed: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === input.id ? { ...task, text: data.text } : task
          )
        );
        setInput({ text: "", isEdit: false, id: null });
      })
      .catch((error) => console.error("Error:", error));
  };

  const addNewTask = () => {
    if (input.isEdit) {
      updateTask();
      return;
    }
    fetch("https://66db2191f47a05d55be72995.mockapi.io/todo/articles/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: input.text,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInput({ ...input, text: "" });
        setTask((prevTasks) => [...prevTasks, data]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <InputGroup>
        <Form.Control
          placeholder="Enter Task"
          value={input.text}
          onChange={(e) => {
            if (e.target.value === "" && input.isEdit)
              setInput({ ...input, text: e.target.value, isEdit: false });
            else setInput({ ...input, text: e.target.value });
          }}
        />
      </InputGroup>
      <Button className="mt-2" variant="success" onClick={addNewTask}>
        {input.isEdit ? "Update" : "Add Task"}
      </Button>
    </div>
  );
}

export default TaskForm;
