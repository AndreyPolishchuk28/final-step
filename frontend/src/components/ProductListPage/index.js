import React, { useEffect, useState } from 'react'
import {ProductListItem} from '../ProductListItem'
import './style.scss'
import { Row, Col, Button } from 'antd';


export const ProductListPage = (props) => {

    const [products, setProducts] = useState([])
    const [currentShownItems, setCurrentShownItems] = useState(0);
    const [stepShownItems, setStepShownItems] = useState(9);

    const getProductsByCategory = async() => { 
        const response = await fetch("/get_products",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: props.match.params.category,
                skip: currentShownItems,
                limit: stepShownItems
            }) 
        });
        const responseJSON = await response.json();
        setProducts([...products, ...responseJSON])
    };

    const showMoreProducts = (e) => {
        setCurrentShownItems(currentShownItems + stepShownItems)
    }

    useEffect(()=>{
        getProductsByCategory()
}, [props.match.params.category, currentShownItems])

    return (
        <div className="pagelist-wrapper">
            <div className="page-top-info">
                <Row>
                <div className="page-top-text">
                        <h4>Category: <span>{props.match.params.category}</span></h4>
                </div>
                </Row>
            </div>
            <div className="pagelist-content">
            <Row gutter={24}>
                    {products.map(item =>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item._id}>
                        <ProductListItem product={item} />
                    </Col>
                )}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pagelist-bottom">
                    
                    <button className="button-outline" onClick={showMoreProducts}>Show More</button>

                </Col>
            </Row>

            </div>
        </div>
    )
};