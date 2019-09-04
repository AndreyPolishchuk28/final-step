import React from "react";

export const SearchResult = (props) =>{
    let productCards;

    if (props.products){
         productCards = props.products.map(item =>{
            return(
                <div>
                    <img src={`/static/img/${item.photo[0]}`}/>
                    <p>`Categories: ${item.category}`</p>
                    <p>`Name: ${item.name}`</p>
                    <p>`Price: ${item.price}`</p>
                </div>
            )
        });
    }
    return(
        <div>
            {productCards}
        </div>
    )
};