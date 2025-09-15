import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <h1>상품 상세 페이지</h1>
        <p>상품 ID: {id}</p>
        <p>이 페이지는 아직 구현되지 않았습니다.</p>
      </div>
    </div>
  );
}

export default ProductDetail;
