import React from 'react';
import './styles.scss';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

const InfoProduct = ({product}) => {
	console.log(product);
	return (
		<div>
			<div>
				<h2>{product.name}</h2>
			</div>
			<div>
				<h3>{product.producer}</h3>
			</div>
			<div>
				<h2>$ {product.price}</h2>
			</div>
			<Tabs className="info-product__tabs" defaultActiveKey="1" onChange={callback}>
				<TabPane tab="Category" key="1">
					<h3>{product.category}</h3>
				</TabPane>
				<TabPane tab="Color" key="2">
					<h3>{product.color}</h3>
				</TabPane>
				<TabPane tab="Number of frets" key="3">
					<h3>{product.number_of_frets}</h3>
				</TabPane>
				<TabPane tab="Scale length" key="4">
					<h3>{product.scale_length}</h3>
				</TabPane>
			</Tabs>
			<div className="info-product">
				<div>
					<button className="info-product__button">Add product</button>
					<span className="qty-text">QTY</span>
					<input value="0" type="text" className="info-product__qty" readonly />
				</div>

				<div>
					<Icon className="info-product__video" type="video-camera" theme="filled" />
					<Icon className="info-product__music" type="play-circle" theme="filled" />
				</div>
			</div>
		</div>
	);
};

export default InfoProduct;
