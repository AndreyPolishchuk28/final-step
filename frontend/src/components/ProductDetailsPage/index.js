import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PhotoProduct from './PhotoProduct';
import InfoProduct from './InfoProduct';
import './styles.scss';
import { Row, Col } from 'antd';
import { getProductDetails } from '../../redux/catalog';


const mapStateToProps = (state) => {
	return { ...state };
};

export const ProductDetailsPage = connect(mapStateToProps, {getProductDetails}) ((props) => {
	let product = props.catalog.currentProductDetails;
	console.log(product)
	
	useEffect(() => {
		props.getProductDetails(props.match.params.id);
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		props.getProductDetails(props.match.params.id);
		window.scrollTo(0, 0);
	}, [props.match.params.id]);

	return (
		<div className="product-details__container">
			<Row>
				<Col xs={24} sm={24} md={12} lg={12}>
					<div className="product-details__container--photo">
						{product.id ? <PhotoProduct product={product} /> : null}
					</div>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12}>
					<div className="product-details__container--info">
						{product.id ? <InfoProduct product={product} /> : null}
					</div>
				</Col>
			</Row>
		</div>
	);
});
