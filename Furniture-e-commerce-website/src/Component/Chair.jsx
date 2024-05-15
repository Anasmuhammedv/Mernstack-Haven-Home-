import React, { useContext } from "react";
// import { Products } from "../../ProductsData/Data";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Globalcontext } from "./GlobalContext";

function Chair() {
  const navigate = useNavigate();
  const [,,,,,,products,setProducts]=useContext(Globalcontext)
  const Table = products.filter((product) => product.title === "chair");

  const rows = [];
  for (let i = 0; i < Table.length; i += 3) {
    rows.push(Table.slice(i, i + 3));
  }
  return (
    <div>
      <Header/>
      <div className="Table-container">
        <div className="mb-20px"></div>

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((item, index) => (
              <div key={index} className="col-md-6">
                <div className="card">
                  <img
                    src={item.productImage}
                    className="img-fluid card-img-top"
                    alt="Bed"
                    onClick={() => navigate(`/${item._id}`)}
                  />

                  <div className="card-body">
                    <h1 className="card-title">{item.title}</h1>
                    <h1 className="card-price">₹{item.price}</h1>
                    <h5>{item.category}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Chair;
