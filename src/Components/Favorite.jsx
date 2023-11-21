import React from 'react';
import { useStateValue } from './StateProvider';
import FavoriteCocktail from './FavoriteCocktail';
import Subtotal from './Subtotal';

function Favorite() {
  const [{ favorite }, dispatch] = useStateValue();

  return (
    <main className="container mx-auto p-6 mt-20">
      <section>
        <header className="flex justify-between mb-8">
          <h2 className="text-2xl font-bold mt-10 mb-10">Your Favorite Cocktails</h2>
          <Subtotal />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {favorite.length > 0 ? (
            favorite.map((item) => (
              <FavoriteCocktail
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <p>No favorite cocktails yet!</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Favorite;
