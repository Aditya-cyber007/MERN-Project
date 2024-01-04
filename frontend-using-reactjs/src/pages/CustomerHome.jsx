import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../features/Products'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import emptyImg from '../assets/empty.png'
import { useState } from 'react'



const CustomerHome = ({showNavbar}) => {

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim() !== '' && searchValue.trim().length > 2) {
      setIsSearch(true)
    } else {
      setIsSearch(false)
    }
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const products = useSelector(state => state.product.products.product)

  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)


  const isLogged = () => {
    if (!token && token === null && token === undefined) {
      navigate('/logout');
    }
  };


  useEffect(() => {
    isLogged();
    dispatch(getProducts())
    showNavbar()
  },[dispatch ])
  


  return (
    <>
      <div style={{ overflowX: 'hidden' }}>

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
  )
}

export default CustomerHome