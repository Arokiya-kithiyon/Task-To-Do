import React from "react";
import TaskList from "./TaskList";
import { Card } from "react-bootstrap";
function Hero() {
  return (
    <div>
      <div className="hero-container ">
        <Card style={{ width: "35rem" }}>
          <Card.Title>
            <div className="text-center mt-3">
              <h3>To DO List</h3>
            </div>
          </Card.Title>
          <Card.Body>
            <TaskList />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Hero;
