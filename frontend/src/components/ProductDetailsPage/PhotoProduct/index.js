import React from 'react';
import './styles.scss';
import ModalView from './ModalView';

const PhotoProduct = ({ product }) => {
	let photo = product.photo;
	return (
		<div>
			<ModalView photo={photo} />
		</div>
	);
};

export default PhotoProduct;
