import React from "react";
import { Products } from "../../ProductsData/Data";
import Allproducts from "./Allproducts";
import Image1 from "../Component/Assets/Images/couch.png";
import "../Css Files/Home.css";
import Header from "./Header";

function Home() {
  return (
    <div>
      <Header />
      <div className="card mb-3 mt-100px">
        <div className="row g-0 Heading">
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title fs-1 fw-bold">
                MADE FOR TRULY MODERN
                <br />
                FURNITURE
              </h1>
              <h5 className="card-title">Sleep Better Dream Bigger </h5>

              <p className="card-text">
                <small className="text-body-secondary">Enjoy</small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <img
              className="img-fluid rounded mx-auto d-block"
              src={Image1}
              alt="Image not found"
            />
          </div>
        </div>
      </div>

      <div>
        <Allproducts />
      </div>
    </div>
  );
}

export default Home;
