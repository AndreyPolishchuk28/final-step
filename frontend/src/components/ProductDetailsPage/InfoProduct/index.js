import React from 'react';
import './styles.scss';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

const InfoProduct = () => {
	return (
		<div>
			<div>
				<h1>Name of product</h1>
			</div>
			<div>
				<h3>Hwo is make</h3>
			</div>
			<div>
				<h2>Price</h2>
			</div>
			<Tabs className="info-product__tabs" defaultActiveKey="1" onChange={callback}>
				<TabPane tab="Tab 1" key="1">
					Content of Tab Pane 1filter: brightness(137%);filter: brightness(137%);filter:
					brightness(137%);filter: brightness(137%);filter: brightness(137%);filter: brightness(137%);
				</TabPane>
				<TabPane tab="Tab 2" key="2">
					Content of Tab Pane 2
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
