
export const addToBasket = (dispatch, product) => {
    return fetch('/add_to_basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: 'ADD_TO_BASKET',
            payload: {basketId: data._id, products: data.products}
        }))
};