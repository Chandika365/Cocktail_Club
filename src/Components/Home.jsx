import React, { useEffect, useState } from 'react'
import Cocktail from './Cocktail'
import CocktailImage from '../Image/CocktailImage.svg'

export default function Home() {
  const [cocktails, setCocktails] = useState([])

  const fetchRandomCocktails = async () => {
    try {
      const responses = await Promise.all(
        Array(5).fill().map(() =>
          fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        )
      )
      const data = await Promise.all(responses.map(Response => Response.json()))

      const randomCocktails = data.map(drinkData => ({
        id: drinkData.drinks[0].idDrink,
        title: drinkData.drinks[0].strDrink,
        category: drinkData.drinks[0].strCategory,
        price: Math.floor(Math.random() * 50) + 5,
        image: drinkData.drinks[0].strDrinkThumb,
        rating: Math.floor(Math.random() * 4) + 1,
      }))
      setCocktails(randomCocktails)
    } catch (error) {
      console.error("Error Fetching data:", error)
    }
  }

  useEffect(() => {
    fetchRandomCocktails()
  }, [])

  const handleRefresh = () => {
    fetchRandomCocktails()
  }

  return (
    <div className="mx-auto max-w-screen px-4 mt-40 flex flex-col align-middle">
      <div className='flex flex-col sm:flex-row items-center justify-center gap-x-6 h-screen max-h-screen/2 max-h-[50vh] my-10'>
                <div className='mx-auto max-w-2xl py-32 sm:py-24 lg:py-28'>
                    <div className='text-center '>
                        <h1 className='text-6xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10 -mt-10'>
                            World Best Class Cocktails
                        </h1>
                    </div>
                </div>
                <div className='relative isolate overflow-hidden py-12 sm:py-16 bg-transparent max-w-full '>
                    <img
                        className='sm:static max-w-full'
                        src={CocktailImage}
                        alt='' />
                </div>
            </div>
      <div className='flex'>
      <button
          onClick={handleRefresh}
          className="block w-40 h-12 select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-semibold"
          type="button"
          data-ripple-light="true"
        >
          Refresh
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-start">
       
        <div className="md:ml-4 flex-wrap grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-10 align-middle">
          {cocktails.map((cocktail) => (
            <Cocktail
              key={cocktail.id}
              id={cocktail.id}
              title={cocktail.title}
              category={cocktail.category}
              price={cocktail.price}
              image={cocktail.image}
              rating={cocktail.rating}
            />
          )) }
        </div>
      </div>
    </div> 
  )
}
