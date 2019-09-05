import React, { useEffect, useState } from 'react'
import {ProductListItem} from './ProductListItem'
import './style.scss'
import {Row, Col} from 'antd';
let currentCategory;

export const ProductListPage = (props) => {

    const [products, setProducts] = useState([]);
    const [currentShownItems, setCurrentShownItems] = useState(0);
    const [stepShownItems, setStepShownItems] = useState(9);
    const [showMoreBtnStatus, setShowMoreBtnStatus] = useState(true);

    const getProducts = async() => {
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
        if (!responseJSON.length) setShowMoreBtnStatus(false);
        if (currentCategory === props.match.params.category) {
            setProducts([...products, ...responseJSON]);
        } else {
            setProducts(responseJSON)
        }
        currentCategory = props.match.params.category
    };

    const showMoreProducts = () => {
        setCurrentShownItems(currentShownItems + stepShownItems)
    };

    useEffect(() => {
        setProducts([]);
        setShowMoreBtnStatus(true);
        setCurrentShownItems(0);
        getProducts()
    }, [props.match.params.category]);

    useEffect(() => {
        getProducts()
    }, [currentShownItems]);

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
                    {showMoreBtnStatus ?
                        <button className="button-outline" onClick={showMoreProducts}>Show More</button>
                        : null
                    }
                </Col>
            </Row>

            </div>
        </div>
    )
};