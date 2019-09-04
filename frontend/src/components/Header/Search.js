import React, {useState} from 'react'

export const Search =() =>{
    const [text,setText] = useState('');

    const SearchProduct = async (event) =>{
        const response = await fetch('/product_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                q: `${event.target.value}`
            }
        });
        const responseJSON = await response.json();

    }

    return(
        <div className='col-xl-6 col-lg-5'>
            <form className='header-search-form'>
                <input onChange={SearchProduct} type='text' placeholder='Music shop search ...'/>
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
    )
};