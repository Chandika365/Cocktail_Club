import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";



function getRandomRating() {
  return Math.floor(Math.random() * 4) + 1;
}

function renderStars(count) {
  return Array.from({ length: count }, (_, i) => <span key={i}>🌟</span>);
}

function getRandomPrice() {
  return Math.floor(Math.random() * (50 - 25) + 25).toFixed(2);
}


function Cocktail() {
  const [{ favorite }, dispatch] = useStateValue()
  const [cocktailData, setCocktailData] = useState(null)
  const [displayedRating, setDisplayedRating] = useState(0)
  const [displayedPrice, setDisplayedPrice] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setCocktailData(data.drinks[0])
        setDisplayedPrice(getRandomPrice())
        setDisplayedRating(getRandomRating())
        setLoading(false)
      } catch (error) {
        console.error('Error Fetching Cocktails :', error)
        setLoading(false)
      }
    }
    fetchCocktail();
  }, []);

  const addToFavorite = () => {
    if (cocktailData) {
      const randomRating = displayedRating
      const randomPrice = displayedPrice

      dispatch({
        type: "ADD_TO_FAVORITE",
        item: {
          id: cocktailData.idDrink,
          title: cocktailData.strDrink,
          category: cocktailData.strCategory,
          image: cocktailData.strDrinkThumb,
          price: randomPrice,
          rating: randomRating,
        },
      })
    }
  }
  return (
    <div>
      {loading ? (
        <p className="mx-4 my-4 bg-green-200">Loading...</p>
      ) : (
        cocktailData && (
          <div class="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div class="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
              <img src={cocktailData.strDrinkThumb} alt={cocktailData.strDrink} />
            </div>
            <div class="p-6">
              <div class="mb-3 flex items-center justify-between">
                <h5 class="block font-sans font-medium leading-snug tracking-normal text-blue-gray-900 antialiased text-base">
                  {cocktailData.strDrink}
                </h5>
                <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">

                  {renderStars(displayedRating)}
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>

                </p>
              </div>
              <div class="mb-3 flex items-center justify-between">
                <p class="block font-sans text-base leading-relaxed text-gray-700 antialiased font-thin">
                  {cocktailData.strCategory}
                </p>
                <p class="flex items-center font-medium gap-1.5 font-sans text-base leading-relaxed text-blue-gray-900 antialiased">
                  <small>$</small> {displayedPrice}
                </p>
              </div>
            </div>
            <div class="p-6 pt-3">
              <button
                onClick={addToFavorite}
                class="block w-full  select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-semibold"
                type="button"
                data-ripple-light="true"
              >
                Add To Favorite
              </button>
            </div>
          </div>
        )
      )

      }
    </div>
  )
}

export default Cocktail