import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from "styled-components";
import { MostPopular } from "./MostPopular";
import SliderItem from "./SliderItem";
import "../../App.css";
import { Row, Col } from "antd";
import { connect } from "react-redux";
const mainColor =  "blueviolet";

const mapStateToProps = state => {
  return {
    ...state
  };
};

export const HomePage = connect(
  mapStateToProps,
)(props => {
  
  return (
    <div>
      <SliderContainer>
        <Slider autoplay={1800}>
          {props.catalog.sliderProducts.map(item => {
            return (
              <div key={item.id}>
                <SliderItem
                  name={item.name}
                  price={item.price}
                  url={`/static/img/${item.photo[1]}`}
                  id={item.id}
                />
              </div>
            );
          })}
        </Slider>
      </SliderContainer>
      <Row>
        <Col xs={24} xl={24} xm={12}>
          <MostPopularContainer>
            <h3>MOST POPULAR PRODUCTS</h3>
            {props.catalog.mostPopularProducts.map(item => {
              return (
                <MostPopular
                  key={item.id}
                  title={item.name}
                  url={`/static/img/${item.photo[0]}`}
                  id={item.id}
                  price={item.price}
                />
              );
            })}
          </MostPopularContainer>
        </Col>
      </Row>
    </div>
  );
});

const SliderContainer = styled.div`
  background: url(/static/img/49760.jpg) no-repeat center center;
  background-size: cover;
  width: 100%;
  text-align: center;
  color: ${mainColor};

  @keyframes shadow {
    from {
      text-shadow: 0px 0px 20px black;
      color: white;
    }
    50% {
      text-shadow: 0px 0px 3px black;
      color: white;

    }
    to {
      text-shadow: 0px 0px 20px black;
      color: white;
    }
  }
  span {
    padding: 8px;
    color: ${mainColor};
    font-size: 28px;
    border: solid 4px #f07;
    border-radius: 5px;
  }
  .copyRight {
    position: absolute;
    bottom: 20px;
    color: white;
    left: 0;
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
    text-shadow: 3px 3px 8px black;
  }
  button {
    position: absolute;
    top: 100px;
    right: 200px;
    width: 150px;
    height: 150px;
    line-height: 150px;
    animation: shadow 1.8s infinite linear;
    text-shadow: 3px 3px 8px black;
    font-size: 44px;
    background-color: ${mainColor};
    border: none;
    border-radius: 50%;
    font-weight: 700;
    box-shadow: 3px 3px 8px black;
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
      box-shadow: 3px 3px 8px black;
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
    transition: 0.6s;
  }
  .most-popular-wrapper:hover {
    border: 2px solid #282828;
    text-shadow: 1px 1px 2px #555;
    transform: scale(1.1)
  }
  p {
    padding-top: 15px;
  }
  h3 {
    padding-top: 20px;
    color: ${mainColor};
    font-weight: 700;
  }
  @media screen and (max-width: 640px) {
    h3 {
      font-size: 18px;
      padding-top: 10px;
    }
  }
`;
