import React from 'react';
import { Carousel } from 'antd';
import './styles.scss';

const gitar = [
	{
		url: 'https://images.ua.prom.st/1154983329_klasichna-gitara-yamaha.jpg'
	},
	{
		url: 'https://images.ua.prom.st/1154983329_klasichna-gitara-yamaha.jpg'
	},
	{
		url: 'https://images.ua.prom.st/1154983329_klasichna-gitara-yamaha.jpg'
	},
	{
		url: 'https://images.ua.prom.st/1154983329_klasichna-gitara-yamaha.jpg'
	}
];

let url = gitar[0].url;

console.log(gitar[0]);

const CarouselProduct = () => {
	return (
		<Carousel autoplay>
			<div>
				<img src={url} />
			</div>
			<div>
				<img src={url} />
			</div>
			<div>
				<img src={url} />
			</div>
			<div>
				<img src={url} />
			</div>
		</Carousel>
	);
};

export default CarouselProduct;
