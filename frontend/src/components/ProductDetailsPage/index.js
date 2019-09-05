import React from 'react';
import PhotoProduct from './PhotoProduct';
import InfoProduct from './InfoProduct';
import './styles.scss';
import { Row, Col } from 'antd';

export const ProductDetailsPage = () => {
	return (
		<div className="product-details__container">
			<Row>
				<Col xs={24} sm={24} md={12} lg={12}>
					<div className="product-details__container--photo">
						<PhotoProduct />
					</div>
				</Col>

				<Col xs={24} sm={24}  md={12} lg={12}>
					<div className="product-details__container--info">
						<InfoProduct />
					</div>
				</Col>
			</Row>
		</div>
	);
};
