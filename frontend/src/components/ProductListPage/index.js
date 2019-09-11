import React, { useEffect, useState } from 'react'
import {ProductListItem} from './ProductListItem'
import './style.scss'
import {Row, Col, Checkbox, Button, InputNumber } from 'antd';

let currentCategory;
let sortingCheapHandler = false;
let sortingExpensiveHandler = false;

export const ProductListPage =  (props) => {
    
    const product = props.product;
    const [products, setProducts] = useState([]);
    const [currentShownItems, setCurrentShownItems] = useState(0);
    const [stepShownItems, setStepShownItems] = useState(9);
    const [showMoreBtnStatus, setShowMoreBtnStatus] = useState(true);
    const [sortFromCheap, setSortFromCheap] = useState([products])
    // const [sortFromExpensive, setSortFromExpensive] = useState([products])
    const [sortStatus, setSortStatus] = useState(true)
    const [sortProducers, setSortProducers] = useState([products])

    const getProducts = async() => {
        const response = await fetch("/get_products",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: props.match.params.category,
                producer: checkedArr,
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
//================================================================ s o r t i n g
    const sortCheap = () => {
        let sortedFromCheapArr = products.sort((a, b) => (a.price > b.price) ? 1 : -1 )
        sortingCheapHandler = true
        sortingExpensiveHandler = false
        setSortStatus(!sortStatus)
        setSortFromCheap(sortedFromCheapArr)
    }
    const sortExpensive = () => {
        let sortedFromExpensiveArr = products.sort((a, b) => (a.price < b.price) ? 1 : -1 )
        sortingExpensiveHandler = true
        sortingCheapHandler = false
        setSortStatus(!sortStatus)
        setSortFromCheap(sortedFromExpensiveArr)
    }

    // const displayProductsHandler = (value) => {
    //     console.log('changed', value);
    //     setStepShownItems(value)
    // }

    let checkedArr = []
    const checkboxHandler = (e) => {
        let checked = e.target.name
        let index = checkedArr.indexOf(e.target.name)
        if (e.target.checked === true){
            checkedArr.push(checked)
        } else {
            checkedArr.splice(index, 1)
        }
    }

    const sortByProducer = (e) => {
        console.log(checkedArr)
    }

    useEffect(() => {
        setProducts([]);
        setShowMoreBtnStatus(true);
        // displayProductsHandler();
        setCurrentShownItems(0);
        getProducts();

    }, [props.match.params.category]);
    
    useEffect(() => {
        getProducts();
    }, [currentShownItems]);

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
                <Row type="flex" justify="space-between" align="center" >
                <div className="page-top-text">
                        <h4 className="category-header">Category: <span>{props.match.params.category}</span></h4>
                </div>
                <div className="price-sorting">
                            <p className="price-sorting__header">sort by price:</p>
                            <span  className="price-sorting__button" onClick={sortCheap}>Cheap first <i class="fas fa-sort-amount-down"></i></span> 
                            <span  className="price-sorting__button" onClick={sortExpensive}>Expensive first <i class="fas fa-sort-amount-up"></i></span>
                        </div>
                </Row>
            </div>
            <div className="pagelist-content">
            <Row gutter={24}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:18, push:6}}>
                    {products.map(item =>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item._id}>
                                <ProductListItem product={item}/>
                        </Col>
                    )}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pagelist-bottom">
                    {showMoreBtnStatus ?
                        <button className="button-outline" onClick={showMoreProducts}>Show More</button> : null
                    }
                </Col>
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:6, pull:18}}>
                    {/* <h4>number of displayed products</h4>
                    <InputNumber min={3} max={30} defaultValue={9} onChange={displayProductsHandler} /> */}

                    <h4>Producer</h4>
                    <Checkbox name="Jackson" onChange={checkboxHandler}>Jackson</Checkbox>
                    <Checkbox name="Ibanez" onChange={checkboxHandler}>Ibanez</Checkbox>
                    <Checkbox name="Hamer"onChange={checkboxHandler}>Hamer</Checkbox>
                    <Button onClick={sortByProducer}>Sort by producer</Button>
                </Col>
            </Row>

            </div>
        </div>
    )
}