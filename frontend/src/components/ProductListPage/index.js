import React from 'react'

export const ProductListPage = () => {
    let prod;
    fetch('/products/0023')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            prod = myJson;
        });
    return (
        <div>Page List
            <img src="/static/img/" alt=""/>
        </div>
    )
};