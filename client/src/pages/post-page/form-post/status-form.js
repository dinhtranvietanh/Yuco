import React, { useState } from "react";
import { Button, Card } from "antd";
import "./style-form.css";
import Form from "./form";
const StatusForm = () => {
  const [status, setStatus] = useState(false);
  return (
    <div>
      <Card
        style={{
          width: "100%",
          borderRadius: 12,
          boxShadow: "3px 3px 3px gray",
          background: "yellow",
        }}
      >
        <div
          style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}
        >
          Hi duelist! What you wanna share?
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => setStatus(true)}
            className="button-status"
            style={{
              width: "30%",
              height: "50px",
              color: "Yellow",
              fontWeight: "bold",
              borderRadius: 20,
              borderColor: "yellow",
              background: "black",
            }}
          >
            Create New Post
          </Button>
        </div>
      </Card>
      <Form status={status} setStatus={setStatus}/>
    </div>
  );
};

export default StatusForm;
