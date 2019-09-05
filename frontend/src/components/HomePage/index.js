import React, { useState, useEffect } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from "styled-components";
import { MostPopular } from "./MostPopular";
import SliderItem from "./SliderItem";
import "../../App.css";

export const HomePage = props => {
  const [photo, setPhoto] = useState([]);
  let photosArr = ["0006", "0004", "0012", "0020"];

  const sliderInfo = async () => {
    let bbb = [];
    for (let i = 0; i < photosArr.length; i++) {
      const response = await fetch(`/products/${photosArr[i]}`);
      const responseJSON = await response.json();
      bbb.push(responseJSON.photo[0]);
    }
    setPhoto(bbb);
  };

  useEffect(() => {
    sliderInfo();
  }, []);

  return (
    <div>
      <SliderContainer>
        <Slider autoplay={800}>
          <div>
            <SliderItem
              name="Fender"
              price="1859"
              // url={`/static/img/${photo[0]}`}
              url="https://medias.audiofanzine.com/images/normal/schecter-reaper-7-multiscale-2402191.png"
              id="0006"
            />
          </div>
          <div>
            <SliderItem
              name="Gibson"
              price="4150"
              // url={`/static/img/${photo[1]}`}
              url="https://dk1xgl0d43mu1.cloudfront.net/user_files/esp/product_images/000/009/842/xlarge.png?1389979422"
              id="0004"
            />
          </div>
          <div>
            <SliderItem
              name="Hamer"
              price="890"
              // url={`/static/img/${photo[2]}`}
              url="https://www.schecterguitars.com/images/store/product/CHRIS%20HOWORTH%202018%20GRAPHIC%20TILT.png"
              id="0012"
            />
          </div>
          <div>
            <SliderItem
              name="Jackson"
              price="2470"
              // url={`/static/img/${photo[3]}`}
              url="https://www.deanguitars.com/images/productimages/vsthbks/vsthbks.png"
              id="0020"
            />
          </div>
        </Slider>
      </SliderContainer>
      <MostPopularContainer>
        <MostPopular
          title="Gibson"
          url="https://medias.audiofanzine.com/images/normal/schecter-reaper-7-multiscale-2402191.png"
          id="0006"
        />
        <MostPopular
          title="Gibson"
          url="https://medias.audiofanzine.com/images/normal/schecter-nick-johnston-traditional-2392118.png"
          id="0004"
        />
        <MostPopular
          title="Gibson"
          url="https://www.schecterguitars.com/images/store/product/CHRIS%20HOWORTH%202018%20GRAPHIC%20TILT.png"
          id="00012"
        />
        <MostPopular
          title="Gibson"
          url="https://www.deanguitars.com/images/productimages/vsthbks/vsthbks.png"
          id="00020"
        />
        <MostPopular
          title="Gibson"
          url="https://dk1xgl0d43mu1.cloudfront.net/user_files/esp/product_images/000/009/842/xlarge.png?1389979422"
          id="0016"
        />
        <MostPopular
          title="Gibson"
          url="https://www.schecterguitars.com/images/store/product/V-1%20PLATINUM%20TILT.png"
          id="0002"
        />
      </MostPopularContainer>
    </div>
  );
};

const SliderContainer = styled.div`
  background: url(https://wallpaperbro.com/img/49760.jpg) no-repeat center
    center;
  background-size: cover;
  width: 100%;
  text-align: center;
  color: #f07;
  @keyframes shadow {
    from {
      color: white;
      background-color: #f07;
    }
    to {
      color: black;
      background-color: #70f;
    }
  }
  span {
    padding: 8px;
    color: #f07;
    font-size: 28px;
    border: solid 4px #f07;
    border-radius: 5px;
  }
  img {
    width: 70%;
    object-fit: contain;
  }
  .guitar-name {
    display: inline-block;
    font-size: 56px;
    color: white;
    text-shadow: 5px 5px 3px black;
    text-align: left;
    padding-right: 100px;
    padding-top: 30px;
  }
  .guitar-price {
    display: inline-block;
    font-size: 22px;
    text-decoration: line-through;
    color: red;
  }
  button {
    position: relative;
    top: 60px;
    right: 100px;
    animation: shadow 0.8s infinite linear;
    font-size: 24px;
    background-color: #f07;
    border: none;
    padding: 10px 20px;
    border-radius: 20%;
    color: white;
    font-weight: 700;
  }
  .slider {
    height: 700px;
  }
`;
const MostPopularContainer = styled.div`
  text-align: center;
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
