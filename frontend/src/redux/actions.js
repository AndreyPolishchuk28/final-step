
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

export const changeQuantity = (dispatch, product) => {
    return fetch('/change_quantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: 'CHANGE_QUANTITY',
            payload: {basketId: data._id, products: data.products}
        }))
};

export const removeProduct = (dispatch, id) => {
    return fetch(`/remove_from_basket/${id}`)
        .then(res => res.json())
        .then(data => dispatch({
            type: 'REMOVE_PRODUCT',
            payload: {basketId: data._id, products: data.products}
        }))
};