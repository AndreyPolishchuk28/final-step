import React from 'react';
import { Carousel } from 'antd';
import './styles.scss';

const PhotoProduct = ({ product }) => {
	let photo = product.photo;
	let caruselItems = photo.map((item) => {
		return (
			<div key={item}>
				<div className="carusel-wrapp">
					<img src={`/static/img/${item}`} />
				</div>
			</div>
		);
	});

	return <Carousel autoplay>{caruselItems}</Carousel>;
};

export default PhotoProduct;
