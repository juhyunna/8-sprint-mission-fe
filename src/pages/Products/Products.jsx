// src/pages/Products/Products.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductList } from '../../lib/api/ProductService';
import ProductCard from '../../components/molecule/ProductCard';
import SearchInput from '../../components/molecule/SearchInput';
import Button from '../../components/atom/Button/Button';
import Dropdown from '../../components/molecule/Dropdown';
import Pagination from '../../components/molecule/Pagination';
import './Products.css';

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;

  // 전체 상품 데이터 가져오기
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        
        const response = await getProductList(currentPage, pageSize, keyword, sortBy);
        console.log('전체 상품 API 응답:', response);
        
        const products = response.list || [];
        const total = response.totalCount || 0;
        
        setAllProducts(products);
        setTotalCount(total);
        setTotalPages(Math.ceil(total / pageSize));
        
      } catch (error) {
        console.error('전체 상품 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [keyword, sortBy, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  if (loading && currentPage === 1) {
    return <div className="loading">로딩중...</div>;
  }

  return (
    <main className="productsPage">
      {/* 판매 중인 상품 섹션 */}
      <section className="allProducts">
        <div className="allProductsHeader">
          <h2>판매 중인 상품</h2>
          <div className="headerControls">
            <SearchInput                     
              placeholder="검색할 상품을 입력해주세요"                     
              value={keyword}                     
              onChange={handleSearchChange}
            />
            <Link to="/registration">
              <Button variant="primary" size="medium">
                상품 등록하기
              </Button>
            </Link>
            <Dropdown
              options={[
                { value: 'recent', label: '최신순' }
              ]}
              value={sortBy}
              onChange={handleSortChange}
              placeholder="정렬 선택"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">로딩중...</div>
        ) : (
          <div className="allProductsGrid">
            {allProducts.map((product) => (
              <ProductCard 
                key={`all-${product.id}`}
                product={product}
              />
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
}

export default Products;