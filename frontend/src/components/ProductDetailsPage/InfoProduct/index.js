import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Tabs, message } from 'antd';
import { addToBasket } from '../../../redux/basket';

const { TabPane } = Tabs;

function callback(key) {}

const mapStateToProps = (state) => {
	return { ...state };
};

const InfoProduct = connect(mapStateToProps, { addToBasket })((props) => {
	const product = props.product;
	const productId = product._id;

	const [ count, setCount ] = useState(1);

	const addToBasketRes = async () => {
		props.addToBasket({
			id: productId,
			quantity: count
		});
		success();
	};

	let increment = () => {
		setCount(count + 1);
	};

	let decrement = () => {
		if (count > 1) setCount(count - 1);
	};

	const success = () => {
		message.success('Product was added to basket!');
	};

	let tabsInfo = {};
	for (let key in product) {
		if (
			key !== '_id' &&
			key !== 'id' &&
			key !== 'name' &&
			key !== 'price' &&
			key !== 'photo' &&
			key !== 'producer'
		) {
			tabsInfo[key] = product[key];
		}
	}

	let tabs = [];
	for (let key in tabsInfo) {
		tabs.push(
			<TabPane tab={key.replace('_', ' ').replace('_', ' ')} key={key}>
				<h3>{tabsInfo[key]}</h3>
			</TabPane>
		);
	}

	tabs.reverse()

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
				{tabs}
			</Tabs>
			<div className="info-product">
				<div>
					<button onClick={addToBasketRes} className="info-product__button">
						Add product
					</button>
					<span className="qty-text">QTY</span>
					<button onClick={decrement} className="info-product__addQty">
						-
					</button>
					<input value={count} type="text" className="info-product__qty" readOnly />

					<button onClick={increment} className="info-product__addQty">
						+
					</button>
				</div>
			</div>
		</div>
	);
});

export default InfoProduct;
