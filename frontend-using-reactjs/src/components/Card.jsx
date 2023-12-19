import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../features/Products";
import ViewProduct from "./ViewProduct";
import { useState } from "react";
import Modal from "./Modal";




const Card = ({product}) => {


  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    //first confirm the delete if yes then dispatch the deleteProduct action  
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      dispatch(deleteProduct(id));
    }
    else{
      return
    }


  };
    const [productData,setProductData]=useState({})
  const products=useSelector(state => state.product.products.product)
  const handleView = async (id) => {
    setIsModalOpen(true)
    const data=products.find((product)=>product._id===id)
    setProductData(data)

      };

  const[editModal,setEditModal]=useState(false)
  const handleEdit = async (id) => {
    const data=products.find((product)=>product._id===id)
    setProductData(data)
    setEditModal(true)    
  };
  const closeModal=()=>{
    setIsModalOpen(false)
    setEditModal(false)
  }

  const [isModalOpen,setIsModalOpen]=useState(false)



  return (
    <>
    {isModalOpen && <ViewProduct closeModal = {closeModal} product={productData} />}
    {editModal && <Modal hideModal = {closeModal} editData={productData} />}
      <div className="card mt-4 mb-3  " onMouseOver={(e)=>{e.currentTarget.style.transform="scale(1.05)"}} 
        onMouseOut={(e)=>{e.currentTarget.style.transform="scale(1)"}}
      style={{marginLeft:"30px", transform:"scale(1)",transition:"transform 0.3s ease-in-out"}}>
        <img
          src={product.img}
          className="card-img-top"
          alt="..."
          style={{ height: "330px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text m-0">
            <strong>Price:</strong> {product.price}
          </p>
          <p className="card-text m-0">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>Description:</strong>
            {product.description}
          </p>

          <div className="d-flex justify-content-center">
          <button className="btn btn-info m-2" onClick={()=>{handleView(product._id)}} >View</button>
          <button className="btn btn-warning m-2" onClick={()=>{handleEdit(product._id)}} >Edit</button>
          <button className="btn btn-danger m-2" onClick={()=>handleDelete(product._id)}>Delete</button>

          </div>

        </div>
      </div>
    </>
  );
};
export default Card;
