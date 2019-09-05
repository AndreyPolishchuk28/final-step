import React from "react";
import {Row, Col} from "antd";
import './style-search-result.css'

export const SearchResult = (props) =>{
    let productCards;
    if (props.products){
        productCards = props.products.map(item =>{
            return(
                <div className='wrapper'>
                    <Row gutter={16}>
                        <Col span={4}>
                            <img className='img-result' src={`/static/img/${item.photo[0]}`}/>
                        </Col>
                        <Col span={12}>
                            <div className='wrapper-search-text' >
                                <p className='search-text'>Categories: {item.category}</p>
                                <p className='search-text'>Name: {item.name}</p>
                                <p className='search-text'>Price: ${item.price}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        });
    }
    return(
        <div className='search-wrapper'>
            {productCards}
        </div>
    )
};