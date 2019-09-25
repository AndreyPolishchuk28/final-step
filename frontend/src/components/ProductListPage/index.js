import React, { useEffect, useState } from 'react'
import {ProductListItem} from './ProductListItem'
import './style.scss'
import {Row, Col, Checkbox} from 'antd';
import {getProducts} from '../../redux/catalog'
import {connect} from 'react-redux'


let currentCategory;
let sortingCheapHandler = false;
let sortingExpensiveHandler = false;
let products;
let skip = 0;
let limit= 9;
let clearOld = true;
let checkedArr = [];
let producers=[];

const mapStateToProps = (state) =>  {
    return {
        ...state
    }
}

export const ProductListPage =  connect (mapStateToProps, {getProducts}) ( (props) => {
    const [sortFromCheap, setSortFromCheap] = useState([])
    const [sortStatus, setSortStatus] = useState(true)
    products = props.catalog.products;
    const getProductsHandler = () => {
        let payload = {
            category: props.match.params.category,
            producer: checkedArr,
            skip: skip,
            limit: limit,
            clearOld: clearOld
        }
        props.getProducts(payload)
    };

    props.catalog.categories.forEach(element => {
        if(element.name === props.match.params.category){
            producers = element.producers              
            }
        })

    const checkboxHandler = (e) => {
        let checked = e.target.name;
        let index = checkedArr.indexOf(e.target.name)
        if (e.target.checked === true){
            checkedArr.push(checked)
        } else {
            checkedArr.splice(index, 1)
        }
        getProductsHandler()
    }

    const showMoreHandler = () => {
        skip += limit;
        clearOld = false;
        getProductsHandler()
        clearOld = true;
    }

    const sortCheap = () => {
        products.sort((a, b) => (a.price > b.price) ? 1 : -1 );
        sortingCheapHandler = true;
        sortingExpensiveHandler = false;
        setSortStatus(!sortStatus)
        setSortFromCheap(products)
    }

    const sortExpensive = () => {
        products.sort((a, b) => (a.price < b.price) ? 1 : -1 )
        sortingExpensiveHandler = true;
        sortingCheapHandler = false;
        setSortStatus(!sortStatus)
        setSortFromCheap(products)
    }

    useEffect(() => {
        skip = 0
        sortingCheapHandler = false;
        sortingExpensiveHandler = false;
        checkedArr= [];
        getProductsHandler();
        
    }, [props.match.params.category]);

    useEffect(()=>{
        if (sortingCheapHandler === true) {
            sortCheap()
        } else if (sortingExpensiveHandler === true) {
            sortExpensive()
        }
    }, [products])

  
    return (
        <div className="pagelist-wrapper">
            <div className="page-top-info">
                <Row type="flex" justify="space-between" align="middle" >
                <div className="page-top-text">
                        <h4 className="category-header">Category: <span>{props.match.params.category}</span></h4>
                </div>
                <div className="price-sorting">
                            <p className="price-sorting__header">sort by price:</p>
                            <span  className="price-sorting__button" onClick={sortCheap} >Cheap first <i className="fas fa-sort-amount-down"></i></span> 
                            <span  className="price-sorting__button" onClick={sortExpensive} >Expensive first <i className="fas fa-sort-amount-up"></i></span>
                        </div>
                </Row>
            </div>
            <div className="pagelist-content">
            <Row gutter={24}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:18, push:6}}>
                    {(products.length) ? 
                        products.map( item => 
                            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item._id}>
                                <ProductListItem product={item}></ProductListItem>
                            </Col>
                            )
                         : null}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pagelist-bottom">
                        {props.catalog.showMoreBtnStatus ?
                            <button className="button-outline" onClick={showMoreHandler}>Show More</button> : null
                        }
                    </Col>
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:6, pull:18}}>
                    <h4>Producer</h4>
                    {producers.map(item => 
                        <Checkbox name={item} onClick={checkboxHandler} key={item}>{item}</Checkbox>
                    )}
                </Col>
            </Row>
            </div>
        </div>
    )
})
