import React, { useState, useEffect } from 'react';
import PhotoProduct from './PhotoProduct';
import InfoProduct from './InfoProduct';
import './styles.scss';
import { Row, Col } from 'antd';

export const ProductDetailsPage = (props) => {
	const [ product, setProduct ] = useState();

	const getProduct = async () => {
		const response = await fetch(`/products/${props.match.params.id}`);
		const responseJSON = await response.json();
		setProduct(responseJSON);
	};

	useEffect(() => {
		getProduct();
	}, []);

	return (
		<div className="product-details__container">
			<Row>
				<Col xs={24} sm={24} md={12} lg={12}>
					<div className="product-details__container--photo">
						{product ? <PhotoProduct product={product} /> : null}
					</div>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12}>
					<div className="product-details__container--info">
						{product ? <InfoProduct product={product} /> : null}
					</div>
				</Col>
			</Row>
		</div>
	);
};
