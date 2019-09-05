import React from 'react';
import { Carousel } from 'antd';
import './styles.scss';

const PhotoProduct = ({ product }) => {
	console.log(product);
	let photo = product.photo;
	console.log(photo);
	let caruselItems = photo.map((item) => {
		return (
			<div className="photo-product__container">
				<img src={`/static/img/${item}`} />
			</div>
		);
	});

	return <Carousel autoplay>{caruselItems}</Carousel>;
};

export default PhotoProduct;
