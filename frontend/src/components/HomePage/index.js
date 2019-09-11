import React, { useState, useEffect } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import styled from "styled-components";
import { MostPopular } from "./MostPopular";
import SliderItem from "./SliderItem";
import "../../App.css";


export const HomePage = () => {
  const [sliderItem, setSliderItem] = useState([]);
  const [mostPopularItem, setMostPopularItem] = useState([]);
  let photosArr = ["0002", "0003", "0011", "0018", "0026"];
  let mostPopularArr = ["0006", "0007", "0008", "0016", "0026", "0021"];


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
      <MostPopularContainer>
        {
          mostPopularItem.map((item)=>{
            return <MostPopular key={item.id}
          title={item.name}
          url={`/static/img/${item.photo[0]}`}
          id={item.id}
        />

          })
        }
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
