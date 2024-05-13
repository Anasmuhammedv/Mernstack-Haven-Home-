import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
// import { Products } from '../../../ProductsData/Data';
import { Globalcontext } from "../GlobalContext";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function AdminProducyEdit() {
  const [
    user,setUser,
    signup,setSignup,
    newUser,setNewUser,
    products,setProducts,
    oneUser,setoneUser
  ] = useContext(Globalcontext);

  const navigate=useNavigate()


  const[title,setTitle]=useState("")
  const[type,setType]=useState("")
  const[price,setPrice]=useState("")
  const[url,setUrl]=useState("")


  const { id } = useParams();
  const filter = products.find((e) => e.id == id);
  console.log(id);

  const handleSubmit=(e)=>{
    e.preventDefault()
    const editProduct=products.map((e)=>{

        let UpdateTitle=title || e.title;
        let UpdateType=type || e.type;
        let UpdatePrice=price||e.price;
        let Updateimage=url||e.image

        if(e.id==id){
            return{
                ...products,
                id   :e.id,
                type :UpdateType,
                title:UpdateTitle,
                price:UpdatePrice,
                image:Updateimage
            }
        }
        else
        return e;


        

    });
    setProducts(editProduct)
    navigate('/AdminView')
    console.log('submitted',title);
  }


  return (
    <div className="" style={{ background: "grey" }}>
      <AdminNavbar />
      <h1>This is admin</h1>

      <div className="d-flex flex-row">
        <img
          className="img-card"
          src={filter.productImage}
          alt=""
          height={"500px"}
          width={"500px"}
        />
        <div style={{marginLeft:"50px"}}>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                  <label htmlFor="title">Title:</label>
                </td>
                <td>
                  <input type="text" placeholder={filter.title} style={{width:"300px"}} onChange={(event)=>setTitle(event.target.value)}/>
                  <br />
                </td>
              </tr>
              <br />
              <tr>
                <td>
                  <label htmlFor="type">Type</label>
                </td>
                <td>
                  <input type="text" placeholder={filter.type} style={{width:"300px"}} onChange={(event)=>setType(event.target.value)}/>
                  <br />
                </td>
              </tr>
              <br />

              <tr>
                <td>
                  <label htmlFor="Price">Price</label>
                </td>
                <td>
                  <input type="number" placeholder={filter.price} style={{width:"300px"}} onChange={(event)=>setPrice(event.target.value)}/>
                  <br />
                </td>
              </tr>
              <br />
              <tr>
                <td>
                  <label htmlFor="image">Image Url</label>
                </td>
                <td>
                  <input type="text" placeholder={filter.image} style={{width:"300px"}} onChange={(event)=>setUrl(event.target.value)}/>
                </td>
              </tr>
            </table>
          <button type="submit">edit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProducyEdit;
