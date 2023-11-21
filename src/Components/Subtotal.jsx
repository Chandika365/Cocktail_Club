import React from 'react'
import { useStateValue } from './StateProvider'
import CurrencyFormat from 'react-currency-format'
import { getFavoriteTotal } from './Reducer'

function Subtotal() {

    const [{favorite}, dispatch] = useStateValue()

    return (
      <div className="flex items-center justify-center h-full">
      <div className="p-4 border rounded-md shadow-md bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className="text-lg text-center">
                Subtotal ({favorite.length}): <strong>{value}</strong>
              </p>
            </>
          )}
          decimalScale={2}
          value={getFavoriteTotal(favorite)}
          displayType="text"
          thousandSeparator={true}
          prefix="$ "
        />
      </div>
    </div>
    
    );
    
}

export default Subtotal