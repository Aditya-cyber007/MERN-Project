
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerProduct, updateProduct } from '../features/Products'
import { useNavigate } from 'react-router-dom'

const Modal = ({ hideModal,editData} ) => {
    const dispatch = useDispatch()
    const userEmail=useSelector(state => state.auth.user.user.email)
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        img: '',
        quantity: '',
        email:userEmail,
    })
    
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(editData){

            dispatch(updateProduct(product))
            console.log("Product Updated Successfully")
            hideModal()
        }
        else{
            dispatch(registerProduct(product))
            hideModal()
        }
    }
    useEffect(() => {
        if(editData){
            setProduct(editData)
        }
    }, [editData])

    return (
        <>
        <div
            className='modal fade show'
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: 'block',backgroundColor:"rgba(0,0,0,0.5)"}}

        >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                    style={{ width: '100%' }}
                >
                    Add Product
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={hideModal}
                ></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    category
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                    </div>
                    

                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Image
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="img"
                        value={product.img}
                        onChange={handleChange}
                    />
                    </div>
                    {
                        !editData?
                        <button type="submit" className="btn btn-primary" > Submit </button>
                        :
                        <button type="submit" className="btn btn-primary"> Update </button>
                    }
                </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Modal
