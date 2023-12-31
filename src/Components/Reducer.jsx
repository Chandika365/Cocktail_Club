//this is data layer

export const initialState = {
    favorite: [],
}

export const getFavoriteTotal = (favorite) =>
    favorite?.reduce((amount, item) => parseFloat(item.price) + amount, 0)

const Reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TO_FAVORITE":
            return {
                ...state,
                favorite: [...state.favorite, action.item],

            }

        case "REMOVE_FROM_FAVORITE":
            const index = state.favorite.findIndex(
                (favoriteItem) => favoriteItem.id === action.id
            )

            let newFavorite = [...state.favorite]

            if (index >= 0) {
                newFavorite.splice(index, 1);
            } else {
                console.warn(
                    "cant remove product its not in basket!"
                )
            }
            return {
                ...state,
                favorite: newFavorite,
            }

        default:
            return state;
    }
}

export default Reducer;