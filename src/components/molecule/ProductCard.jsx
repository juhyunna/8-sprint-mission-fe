// src/components/molecule/ProductCard.jsx
import "./ProductCard.css";
import LikeIcon from "../atom/Icons/LikeIcon";

function ProductCard({ product, onClick }) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="productCard" onClick={onClick}>
      <div className="productImage">
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>
      <div className="productInfo">
        <h3 className="productTitle">{product.name}</h3>
        <p className="productPrice">{product.price?.toLocaleString()}원</p>
        {/* LikeIcon 컴포넌트 사용 */}
        <LikeIcon count={product.favoriteCount || 0} />
      </div>
    </div>
  );
}

export default ProductCard;
