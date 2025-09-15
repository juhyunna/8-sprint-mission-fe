import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="headline-wrap">
        <div className="global-nav-bar">
          <div className="headline-text">
            <h1 className="main-title">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link to="/items" className="explore-btn">
              구경하러가기
            </Link>
          </div>
          <img
            className="headline-image"
            src="./images/headline-image.svg"
            alt="Headline Image"
          />
        </div>
      </div>

      <div className="main-body-content">
        <div className="hot-items">
          <img
            className="main-img-left"
            src="./images/hot-items.svg"
            alt="Hot Items"
          />
          <div className="main-txt-right">
            <h3 className="main-subtitle">Hot items</h3>
            <h1 className="main-title">
              인기 상품을 <br />
              확인해 보세요
            </h1>
            <p className="main-description">
              가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className="search">
          <div className="main-txt-right">
            <h3 className="main-subtitle">Search</h3>
            <h1 className="main-title">구매를 원하는 상품을 검색하세요</h1>
            <p className="main-description">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
          <img
            className="main-img-right"
            src="./images/search.svg"
            alt="Search"
          />
        </div>

        <div className="register">
          <img
            className="main-img-left"
            src="./images/register.svg"
            alt="Register"
          />
          <div className="main-txt-right">
            <h3 className="main-subtitle">Register</h3>
            <h1 className="main-title">
              판매를 원하는 상품을 <br />
              등록하세요
            </h1>
            <p className="main-description">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
