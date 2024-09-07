import React, { useEffect, useState, useContext, createContext } from "react";
import Form from "./TaskForm";
import { Button } from "react-bootstrap";
import { inputContext } from "./hook/inputContext";
function TaskList() {
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState({ text: "", isEdit: false, id: null });

  const editHandler = (id, text) => {
    setInput({ text, isEdit: true, id });
  };

  const deleteHandler = (id) => {
    fetch(
      `https://66db2191f47a05d55be72995.mockapi.io/todo/articles/task/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => data.json())
      .then((jsonData) => {
        console.log(jsonData);
        const remainingTasks = tasks.filter((task) => task.id !== id);
        setTask([...remainingTasks]);
      })
      .catch((er) => {
        console.error(er);
      });
  };

  useEffect(() => {
    fetch("https://66db2191f47a05d55be72995.mockapi.io/todo/articles/task")
      .then((data) => data.json())
      .then((jsonData) => {
        setTask([...jsonData]);
        console.log(jsonData);
      })
      .catch((er) => {
        console.error(er);
      });
  }, []);
  return (
    <div>
      <inputContext.Provider value={{ input, setInput }}>
        <Form setTask={setTask} />
      </inputContext.Provider>

      <div className="task-container">
        {(tasks?.length > 0 &&
          tasks.map((task) => {
            return (
              <div key={task.id} className="task-row row mt-1">
                <div className="col-8">{task.text}</div>
                <div className="col-2">
                  <Button
                    variant="primary"
                    onClick={() => editHandler(task.id, task.text)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="col-2">
                  <Button
                    variant="primary"
                    onClick={() => deleteHandler(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })) || (
          <div className="mt-3 text-center">
            <h4>Please Add Tasks</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
