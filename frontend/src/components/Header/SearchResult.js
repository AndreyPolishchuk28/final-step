import React from "react";
import {Row, Col} from "antd";
import './style-search-result.css'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {getSearchProducts} from "../../redux/catalog";

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const SearchResult = connect(mapStateToProps, {getSearchProducts})((props) =>{
    let productCards = props.products.map(item =>{
            return(
                <Link onClick={() =>{
                    props.getSearchProducts({q:''});
                    props.setValue('')
                }} to={`/product/${item.id}`}>
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
                </Link>
            )

        });
    return(
        <div className='search-wrapper'>
            {productCards}
        </div>
    )
});