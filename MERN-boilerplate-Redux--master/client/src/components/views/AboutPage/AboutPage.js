import React from "react";
import { Descriptions } from "antd";
import "./AboutPage.css";
import { Button } from "antd";

function AboutPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", color: "white" }}
      className="bg"
    >
      {/* <img
          style={{ }}
          src={`https://images.unsplash.com/photo-1587280501635-a19de238a81e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNyaWNrZXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`}
        ></img> */}

      {/* <p>Hello</p> */}
      <div style={{ marginTop: "460px" }}>
        <h3 style={{ color: "white" }}>BORN TO PLAY</h3>
        <Button type="danger">
          <a href="/products">Learn More</a>
        </Button>
        <p style={{marginTop:'40px'}}>
          “Thanks to BigCommerce, we scaled our business from our very first
          order to now a recognized brand, and the platform is able to grow with
          us as we need it to.” — Our Team
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
