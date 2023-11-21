import React from 'react'
import { UseStateValue } from './StateProvider'
import CurrencyFormat from 'react-currency-format'
import { getFavoriteTotal } from './Reducer'

function Subtotal() {

    const [{favorite}, dispatch] = UseStateValue()

    return (
      <div className="p-4 border rounded-md shadow-md">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className="text-lg">
                Subtotal ({favorite.length}): <strong>{value}</strong>
              </p>
            </>
          )}
          decimalScale={2}
          value={getFavoriteTotal(favorite)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    );
    
}

export default Subtotal