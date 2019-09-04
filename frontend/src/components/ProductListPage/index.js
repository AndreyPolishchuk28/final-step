import React, { useEffect, useState } from 'react'


export const ProductListPage = (props) => {

    const [products, setProducts] = useState([])
    
    const getProductsByCategory = async() => { 
        const response = await fetch(`/category/${props.match.params.category}`);
        const responseJSON = await response.json();
        setProducts(responseJSON.products)
    };

    console.log(products)    
    
    useEffect(()=>{
        getProductsByCategory()
}, [props.match.params.category])



    return (
        <div>
            <div>Page List</div>
            {products.map(item => <img src={`/static/img/${item.photo[0]}`}/>)}  
        </div>
    )
};