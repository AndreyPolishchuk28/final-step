import React, { useEffect, useState } from 'react'
import {ProductListItem} from './ProductListItem'
import './style.scss'
import {Row, Col, Checkbox, Button, InputNumber } from 'antd';

import {getProducts} from '../../redux/catalog'
import {connect} from 'react-redux'


let currentCategory;
let sortingCheapHandler = false;
let sortingExpensiveHandler = false;
let products;
let skip = 0;
let limit= 9;
let clearOld = true;

const mapStateToProps = (state) =>  {
    return {
        ...state
    }
}


export const ProductListPage =  connect (mapStateToProps, {getProducts}) ( (props) => {
    
    products = props.catalog.products;

    const getProductsHandler = () => {
        let payload = {
            category: props.match.params.category,
            producer:[], 
            skip: skip,
            limit: limit,
            clearOld: clearOld
        }
        props.getProducts(payload)
    };

    const showMoreHandler = () => {
        skip += limit;
        clearOld = false;
        getProductsHandler()
        clearOld = true;
    }
    useEffect(() => {
        getProductsHandler();
    }, []);

    return (
        <div className="pagelist-wrapper">
            <div className="page-top-info">
                <Row type="flex" justify="space-between" align="middle" >
                <div className="page-top-text">
                        <h4 className="category-header">Category: <span>{props.match.params.category}</span></h4>
                </div>
                <div className="price-sorting">
                            <p className="price-sorting__header">sort by price:</p>
                            <span  className="price-sorting__button" >Cheap first <i className="fas fa-sort-amount-down"></i></span> 
                            <span  className="price-sorting__button" >Expensive first <i className="fas fa-sort-amount-up"></i></span>
                        </div>
                </Row>
            </div>
            <div className="pagelist-content">
            <Row gutter={24}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:18, push:6}}>
                    
                    {(products.length) ? products.map( item => 
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item._id}>
                            <ProductListItem product={item}></ProductListItem>
                        </Col>
                    ) : null}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pagelist-bottom">
                        {props.catalog.showMoreBtnStatus ?
                            <button className="button-outline" onClick={showMoreHandler}>Show More</button> : null
                        }
                    </Col>
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:6, pull:18}}>
                    {/* <h4>number of displayed products</h4>
                    <InputNumber min={3} max={30} defaultValue={9} onChange={displayProductsHandler} /> */}

                    <h4>Producer</h4>
                    <Checkbox name="Jackson" >Jackson</Checkbox>
                    <Checkbox name="Ibanez" >Ibanez</Checkbox>
                    <Checkbox name="Hamer">Hamer</Checkbox>
                    <Button >Sort by producer</Button>

                </Col>
            </Row>

            </div>
        </div>
    )
})
