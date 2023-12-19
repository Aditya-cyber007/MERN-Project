import React from "react";


const ViewProduct = ({ closeModal,product}) => {

  return (
    <div
      className="modal fade show"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="viewProductModalLabel"
      aria-hidden="true"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        // onClick={closeModal}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="viewProductModalLabel">
              {product.name}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{
                outline: "none",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                fontSize: "30px",
              }}
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <img
                    src={product.img}
                  alt="Product Image"
                  className="img-fluid"
                  style={{ paddingRight: "20px" }} // Adjust the padding as needed
                />
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Price:</strong> {product.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <p>Seller's Email: {product.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
