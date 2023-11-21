import React from 'react'
import { UseStateValue } from './StateProvider'
import FavoriteCocktail from './FavoriteCocktail'
import Subtotal from './Subtotal'

function Favorite() {
  const [{ favorite }, dispatch] = UseStateValue()

  return (
    <div className="container mx-auto p-6 mt-20 flex flex-col">

      <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mt-10 mb-10">Your Favorite Cocktails</h2>
      <Subtotal/>
      
      </div>
      

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {favorite.map((item) => (
            <FavoriteCocktail
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div>
      </div>
    </div>
  );
  
}

export default Favorite