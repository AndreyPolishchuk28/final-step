import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from "styled-components";
import { MostPopular } from "./MostPopular";
import SliderItem from "./SliderItem";
import "../../App.css";

export const HomePage = () => {
  return (
    <SliderContainer>
      <Slider autoplay={800}>
        <div
          style={{
            background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center`
          }}
          >
          <SliderItem 
          name="Fender"
          price="1859"
          url="https://img.audiofanzine.com/images/u/product/normal/schecter-e-1-koa-272750.png"
          />
        </div>
        <div
          style={{
            background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center`
          }}
          >
          <SliderItem 
          name="Gibson"
          price="4150"
          url="https://www.schecterguitars.com/images/store/product/C-1%20FR-S%20SLS%20ELITE%20BFB%20TILT.png"
          />
        </div>
        <div
          style={{
            background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center`
          }}
          >
          <SliderItem 
          name="Hamer"
          price="890"
          url="https://www.schecterguitars.com/images/store/product/E-1%20SLS%20ELITE%20BFB%201345%20TILT.png"
          />
        </div>
        <div
          style={{
            background: `url('http://www.vichealth.vic.gov.au/-/media/images/vichealth/images-and-files/funding/female-participation-in-sport/cogfunding1-1200x675.jpg') no-repeat center center`
          }}
          >
          <SliderItem 
          name="Jackson"
          price="2470"
          url="https://medias.audiofanzine.com/images/normal/schecter-c-7-multiscale-sls-elite-2086159.png"
          />
        </div>
        
      </Slider>
      <MostPopular
        title="Gibson"
        url="https://medias.audiofanzine.com/images/normal/schecter-reaper-7-multiscale-2402191.png"
      />
      <MostPopular
        title="Gibson"
        url="https://medias.audiofanzine.com/images/normal/schecter-nick-johnston-traditional-2392118.png"
      />
      <MostPopular
        title="Gibson"
        url="https://www.schecterguitars.com/images/store/product/CHRIS%20HOWORTH%202018%20GRAPHIC%20TILT.png"
      />
      <MostPopular
        title="Gibson"
        url="https://www.deanguitars.com/images/productimages/vsthbks/vsthbks.png"
      />
      <MostPopular
        title="Gibson"
        url="https://dk1xgl0d43mu1.cloudfront.net/user_files/esp/product_images/000/009/842/xlarge.png?1389979422"
      />
      <MostPopular
        title="Gibson"
        url="https://www.schecterguitars.com/images/store/product/V-1%20PLATINUM%20TILT.png"
      />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  text-align: center;
  color: #f07;
  span {
    padding: 8px;
    color: #f07;
    font-size: 28px;
    border: solid 4px #f07;
    border-radius: 5px;
  }
  img {
    width: 900px;
  }
  button {
    background-color: #f07;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
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
    color: #f07;
    font-size: 22px;
    background-color: #159;
    border-radius: 15px;
  }
`;
