import React, { useState, useEffect } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from "styled-components";
import { MostPopular } from "./MostPopular";
import SliderItem from "./SliderItem";
import "../../App.css";
import { Row, Col } from 'antd';


export const HomePage = () => {
  const [sliderItem, setSliderItem] = useState([]);
  const [mostPopularItem, setMostPopularItem] = useState([]);
  let photosArr = ["0002", "0003", "0011", "0018", "0026"];
  let mostPopularArr = ["0001", "0003", "0002", "0005", "0010", "0018", "0012", "0020"];


  const info = async (array, setArray) => {
    let photoFetch = [];
    for (let i = 0; i < array.length; i++) {
      const response = await fetch(`/products/${array[i]}`);
      const responseJSON = await response.json();
      photoFetch.push(responseJSON);
    }
    setArray(photoFetch);
  };

  useEffect(() => {
    info(photosArr, setSliderItem);
    info(mostPopularArr, setMostPopularItem);
  }, []);



  return (
    <div>
      <SliderContainer>
        <Slider autoplay={800}>
          {
            sliderItem.map((item) => {
              return <div key={item.id}>
                <SliderItem
                  name={item.name}
                  price={item.price}
                  url={`/static/img/${item.photo[1]}`}
                  id={item.id}
                />
              </div>
            })
          }
        </Slider>
      </SliderContainer>
      <Row>
        <Col xs={24} xl={24} xm={12}>


          <MostPopularContainer>
            {
              mostPopularItem.map((item) => {
                return <MostPopular key={item.id}
                  title={item.name}
                  url={`/static/img/${item.photo[0]}`}
                  id={item.id}
                  price={item.price}
                />

              })
            }
          </MostPopularContainer>
        </Col>
      </Row>
    </div>
  );
};

const SliderContainer = styled.div`
  background: url(/static/img/49760.jpg) no-repeat center
  center ;
  background-size: cover;
  width: 100%;
  text-align: center;
  color: blueviolet;

  
  @keyframes shadow {
    from {
      color: yellow;
    }
    to {
      color: #555;
    }
  }
  span {
    padding: 8px;
    color: blueviolet;
    font-size: 28px;
    border: solid 4px #f07;
    border-radius: 5px;
  }
  .copyRight{
    position: absolute;
    bottom: 20px;
    color: white;
    left: 0 ;
    right: 0;
  }
  img {
    margin-top: 50px;
    width: 70%;
    object-fit: contain;
    
  }
  .guitar-name {
    display: inline-block;
    font-size: 56px;
    color: white;
    text-shadow: 3px 3px 8px black;
    text-align: left;
    padding-right: 40px;
    padding-top: 30px;
  }
  .guitar-price {
    display: inline-block;
    font-size: 32px;
    text-decoration: line-through;
    color: white;
    text-shadow:  3px 3px 8px black;
  }
  button {
    position: absolute;
    top: 100px;
    right: 200px;
    width: 150px;
    height: 150px;
    line-height: 150px;
    animation: shadow 0.8s infinite linear;
    font-size: 44px;
    background-color: blueviolet;
    border: none;
    border-radius: 50%;
    color: white;
    font-weight: 700;
    box-shadow:  3px 3px 8px black;
  }
  .slider {
    height: 700px;
  }
  
  @media screen and (max-width: 980px) {
          .slider {
          height: 500px;
        }
  
  }
  @media screen and (max-width: 640px) {
    button {
      top: 60px;
      right: 80px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      box-shadow:  3px 3px 8px black;
    }
    .guitar-price {
    font-size: 16px;
  }
    .guitar-name {
      font-size: 22px;
      padding-right: 20px;
      padding-top: 15px;
    }
    
    .slider {
    height: 350px;
  }
}
`;
const MostPopularContainer = styled.div`
margin: 0 auto;
max-width: 1200px;
text-align: center;
.most-popular {
  object-fit: contain;
  width: 250px;
  height: 200px;
}

.most-popular-wrapper {
  border: 2px solid white;
  box-sizing: border-box;
  color: #282828;
  display: inline-block;
  margin: 20px;
  font-size: 22px;
  border-radius: 5px;
}
p {
  padding-top: 15px;
}
.most-popular-wrapper:hover {
  border: 2px solid #282828;
  text-shadow: 1px 1px 2px #555;
  }
`;
