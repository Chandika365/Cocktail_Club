import React, { useState } from 'react'
import { UseStateValue } from './StateProvider'

const Search = ({ id, image, title, category, price, rating }) => {

  const [searchTerm, setSearchterm] = useState('')
  const [searchResult, setSearchResults] = useState([])
  const [searchError, setSearchError] = useState('')
  const [{favorite}, dispatch] = UseStateValue()

  const getRandomRating = () => Math.floor(Math.random() * 4) + 1;
  const getRandomPrice = () => (Math.random() * (50 - 25) + 25).toFixed(2)

  const addToFavorite = (cocktailData) =>{
    dispatch({
      type: 'ADD_TO_FAVORITE',
      item: {
        id: cocktailData.id,
        title:cocktailData.title,
        category:cocktailData.category,
        image:cocktailData.image,
        price:cocktailData.price,
        rating:cocktailData.rating,
      },
    })
  }

  const renderRatings = (rating) =>{
    const displayedRating = Math.floor(rating)
    return (
      <div>
        {
          [...Array(displayedRating)].map((_, i) =>(
            <span key={i}>🌟</span>
          ))
        }
      </div>
    )
  }

  const handleSearch = async () => {
    setSearchError('')
    try{
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();

      if(data.drinks){
        setSearchResults(data.drinks.map(cocktailData =>({
          id:cocktailData.idDrink,
          title:cocktailData.strDrink,
          category:cocktailData.strCategory,
          image:cocktailData.strDrinkThumb,
          price:getRandomPrice(),
          rating:getRandomRating(),
        })))
      } else {
        setSearchResults([])
        setSearchError('Sorry , your item is not available right now.')
      }

    }catch (error){
      console.error('Error fetching data:', error)
      setSearchError('Failed to fetch data. Please try again.')
    }
  }

  const handleSearchClick = () =>{
    if (searchTerm.trim() !== ''){
      handleSearch()
    }else {
      setSearchError('Please enter a search term')
    }
  }


  return (
    <div className='mt-20 mx-auto max-w-screen px-20'>
  <input
        className='w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-green-500'
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchterm(e.target.value)}
        placeholder='Search Cocktails...'
      />
     <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-500'
        onClick={handleSearchClick}
      >
        Search
      </button>
      {searchError && <p className='text-red-500'>{searchError}</p>}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-10'>
        {searchResult.map((cocktailData) => (
          <div key={cocktailData.id} className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
          <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
              <img src={cocktailData.image} alt={cocktailData.title} />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          </div>
          <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                  <h5 className="block font-sans font-medium leading-snug tracking-normal text-blue-gray-900 antialiased text-base">
                      {cocktailData.title}
                  </h5>
                  <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                      {renderRatings(cocktailData.rating)}
                      <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                      ></path>

                  </p>
              </div>
              <div className="mb-3 flex items-center justify-between">
                  <p className="block font-sans text-base leading-relaxed text-gray-700 antialiased font-thin">
                      {cocktailData.category}
                  </p>
                  <p className="flex items-center font-medium gap-1.5 font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
                      <small>$</small> {cocktailData.price}
                  </p>
              </div>
          </div>
          <div class="p-6 pt-3">
              <button
                  onClick={() => addToFavorite(cocktailData)}
                  class="block w-full select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-semibold"
                  type="button"
                  data-ripple-light="true"
              >
                  Add To Favorite
              </button>
          </div>
      </div>
        ))}
      </div>
    </div>
  )
}

export default Search