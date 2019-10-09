import React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import './styles.scss';

const ModalView = (props) => {
	return (
		<div>
			<ImageZoom
				image={{
					src: `/static/img/${props.photo[0]}`,
					className: 'img',
					style: { width: '100%' }
				}}
				zoomImage={{
					className: 'imageZoom'
				}}
			/>
		</div>
	);
};

export default ModalView;
