import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Tabs, message, Icon } from 'antd';
import { addToBasket } from '../../../redux/basket';
import { notification } from 'antd';

const { TabPane } = Tabs;

function callback(key) {}

const mapStateToProps = (state) => {
	return { ...state };
};

const InfoProduct = connect(mapStateToProps, { addToBasket })((props) => {
	const product = props.product;
	const productId = product._id;

	const [ count, setCount ] = useState(1);

	const openNotificationWithIcon = (type) => {
		notification[type]({
			message: 'Product has been added!'
		});
	};

	const addToBasketRes = async () => {
		props.addToBasket({
			id: productId,
			quantity: count
		});
		openNotificationWithIcon('success');
	};

	let increment = () => {
		setCount(count + 1);
	};

	let decrement = () => {
		if (count > 1) setCount(count - 1);
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

	tabs.reverse();

	return (
		<div>
			<div>
				<h2 className="info-product__title">{product.name}</h2>
			</div>
			<div>
				<h3 className="info-product__producer">{product.producer}</h3>
			</div>
			<div>
				<h2 className="info-product__price">$ {product.price}</h2>
			</div>
			<Tabs className="info-product__tabs" defaultActiveKey="1" onChange={callback}>
				{tabs}
			</Tabs>
			<div className="info-product">
				<div>
					<span className="qty-text">QTY</span>
					<Icon type="minus-circle" className="plus-circle" onClick={decrement} />
					<input value={count} type="text" className="info-product__qty" readOnly />

					<Icon type="plus-circle" className="plus-circle" onClick={increment} />

					<button onClick={addToBasketRes} className="info-product__button">
						Add to basket
					</button>
				</div>
			</div>
		</div>
	);
});

export default InfoProduct;
