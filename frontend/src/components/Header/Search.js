import React, {useEffect, useState} from 'react'
import {SearchResult} from "./SearchResult";
let flag = false;

export const Search =() =>{
    const [products, setProducts] = useState();
    const [value, setValue] = useState();

    const SearchProduct = async (event) =>{
        setValue(event.target.value);
        if(value){
            const response = await fetch('/product_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: `${event.target.value}`
                })
            });
            const responseJSON = await response.json();
            setProducts(responseJSON)
        } else {
            setProducts([])
        }
    };

    return(
        <div className='col-xl-6 col-lg-5'>
            <form className='header-search-form'>
                <input id='search' onChange={SearchProduct} value={value} type='text' placeholder='Music shop search ...'/>
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <SearchResult products={products} setValue={setValue} setProducts={setProducts}/>
        </div>
    )
};