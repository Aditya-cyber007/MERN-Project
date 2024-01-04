import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { getProductbyEmail, getProducts, searchProduct } from '../features/Products';
import Modal from '../components/Modal';
import emptyImg from '../assets/empty.png';

const Home = ({ showNavbar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products.product);
  const user = useSelector((state) => state.auth.user.user);
  const customer = useSelector((state) => state.auth.user.customer);

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

  const handleSearch = (e) => {
    
    e.preventDefault();
    if (searchValue.trim() !== '' && searchValue.trim().length > 2) {
      if(!isNaN(searchValue[0]) && !checkForHexRegExp.test(searchValue)){
        //make search value 24 characters long
        const length=searchValue.length
        let temp=searchValue
        for(let i=0;i<24-length;i++){
          temp=temp+"0"

        }
        setSearchValue(temp)
        if(checkForHexRegExp.test(searchValue)){
        console.log(searchValue)
        setIsSearch(true);
        }
        else{
          alert('Please enter a valid id')
        }
        
      }
      else{
        setIsSearch(true);
      }
    } else {
      setIsSearch(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };
    const isLogged = () => {
    if (!token && token === null && token === undefined) {
      navigate('/logout');
    }
  };

  useEffect(() => {
    isLogged();
    if(isSearch ) {
      dispatch(searchProduct(searchValue))
    }
    else if(isAdmin) {
      dispatch(getProducts())
    }
    else if(user) {
      dispatch(getProductbyEmail(user.email))
    }
    else if(customer) {
      navigate('/customer')
    }
    showNavbar();
  }, [isSearch, dispatch, showNavbar,user,email,token]);

  useEffect(() => {
    if (user) {
      if(user.isAdmin) {
        setIsAdmin(true)
        setEmail(user.email)
      }
    }
  }, [user, dispatch, email])



  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        {isModalOpen && <Modal hideModal={hideModal} />}

        <form
          className="d-flex justify-content-center"
          onSubmit={handleSearch}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: '20%', margin: '20px' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-warning" style={{ margin: '20px' }} type="submit">
            Search
          </button>
        </form>

        <div
          className="d-flex justify-content-center"
          style={{ position: 'fixed', bottom: '25px', right: '0' }}
        >
          <button className="btn btn-primary" onClick={showModal} style={{ marginRight: '10px' }}>
            Add Item
          </button>
        </div>

        <div className="row ">
        <div className="col-12 justify-content-center " style={{ display: 'flex', flexWrap: 'wrap'}}> 
            {products ? (
            products.map((product) => <Card key={product._id} product={product} />)
          ) : (
            null
          )}

          {
            (!products || products.length === 0) && (
            <div className="d-flex flex-row justify-content-center mt-4">
              <img src={emptyImg} alt="empty" style={{ height: '65vh' }} />
              
            </div>
         )
        }
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
