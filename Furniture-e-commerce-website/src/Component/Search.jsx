import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";






function Search() {
  const navigate = useNavigate();
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);
  const [searching, setSearching] = useState(true); 

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7907/api/users/products/category/${term}`);
        setFilterData(response.data);
        setSearching(false); 
      } catch (error) {
        console.error("Error fetching search data:", error);
        setSearching(false); 
      }
    };
    searchData();
  }, [term]);

  return (
    <div>
      <Header/>
      <div className="container mt-4">
        {searching ? (
          <div>Loading...</div>
        ) : filterData.length === 0 ? ( 
          <div><h3>No products found for "{term}"</h3></div>
        ) : (
          <div className="row">
            {filterData.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card">
                  <img
                    src={product.productImage}
                    className="card-img-top"
                    alt={product.title}
                    onClick={() => navigate(`/${product._id}`)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category}</p>
                    <p className="card-text">Price: ${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Search;

