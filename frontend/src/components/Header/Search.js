import React, {useState} from 'react'
import {SearchResult} from "./SearchResult";
let flag = false;

export const Search =() =>{
    const [products, setProducts] = useState();


    const SearchProduct = async (event) =>{
        if (event.target.value){
            flag = true
        }else {
            flag = false
        }
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
            if (flag){
                setProducts(responseJSON)
            }
            else{
            setProducts([])
            }
    }
    console.log(products);
    return(
        <div className='col-xl-6 col-lg-5'>
            <form className='header-search-form'>
                <input onChange={SearchProduct} type='text' placeholder='Music shop search ...'/>
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <SearchResult products={products}/>
        </div>
    )
};