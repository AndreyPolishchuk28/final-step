import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from 'styled-components'
import { MostPopular } from "./MostPopular";

export const HomePage = () => {
  return (
    <SliderContainer>

    
      <Slider autoplay={800}>
        <div
        style={{ background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center` }}>
          <div >
            <div >
              <h1>Jackson</h1>
              <p>1999$</p>
              <button>Buy</button>
            </div>
            <section>
              <img
                src="https://www.schecterguitars.com/images/store/product/C-1%20FR-S%20SLS%20ELITE%20BFB%20TILT.png"
                alt="img"
              />
              <span>
                Posted by <strong>Vasyl</strong>
              </span>
            </section>
          </div>
        </div>
        <div style={{ background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center` }}>
          <div className="slider-content">
            <div className="inner">
              <h1>Gibson</h1>
              <p>3499$</p>
              <button>buy</button>
            </div>
            <section>
              <img
                src="https://www.schecterguitars.com/images/store/product/E-1%20SLS%20ELITE%20BFB%201345%20TILT.png"
                alt="img"
              />
              <span>
                Posted by <strong>Vasyl</strong>
              </span>
            </section>
          </div>
        </div>
        <div style={{ background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center` }}>
          <div className="slider-content">
            <div className="inner">
              <h1>Hamer</h1>
              <p>1599$</p>
              <button>Buy</button>
            </div>
            <section>
              <img
                src="https://medias.audiofanzine.com/images/normal/schecter-c-7-multiscale-sls-elite-2086159.png"
                alt="img"
              />
              <span>
                Posted by <strong>Vasyl</strong>
              </span>
            </section>
          </div>
        </div>
        <div style={{ background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center` }}>
          <div className="slider-content">
            <div className="inner">
              <h1>Fender</h1>
              <p>1899$</p>
              <button>Buy</button>
            </div>
            <section>
              <img
                src="https://img.audiofanzine.com/images/u/product/normal/schecter-e-1-koa-272750.png"
                alt="img"
              />
              <span>
                Posted by <strong>Vasyl</strong>
              </span>
            </section>
          </div>
        </div>
      </Slider>
      <MostPopular title='Gibson' url='https://medias.audiofanzine.com/images/normal/schecter-reaper-7-multiscale-2402191.png' />
      <MostPopular title='Gibson' url='https://medias.audiofanzine.com/images/normal/schecter-nick-johnston-traditional-2392118.png' />
      <MostPopular title='Gibson' url='https://www.schecterguitars.com/images/store/product/CHRIS%20HOWORTH%202018%20GRAPHIC%20TILT.png' />
      <MostPopular title='Gibson' url='https://www.deanguitars.com/images/productimages/vsthbks/vsthbks.png' />
      <MostPopular title='Gibson' url='https://dk1xgl0d43mu1.cloudfront.net/user_files/esp/product_images/000/009/842/xlarge.png?1389979422' />
      <MostPopular title='Gibson' url='https://www.schecterguitars.com/images/store/product/V-1%20PLATINUM%20TILT.png' />
      </SliderContainer>
    
  );
};

const SliderContainer = styled.div`
span {
color: white;
font-size: 28px;

}
img {
  width: 900px;
}
.slider {
  height: 600px;
}

.most-popular {
  width: 450px;
  height: 200px;
  object-fit: contain;
}

.most-popular-wrapper {
  display: inline-block;
  margin: 20px;
  color: white;
  font-size: 22px;
  background-color: #159;
  border-radius: 15px;
}


`