import React from 'react'


export const ProductListPage = () => {
    let prod;
    fetch('/category/guitars')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            prod = myJson;
        });

        console.log(prod)
    return (
        <div>Page List</div>
    )
};