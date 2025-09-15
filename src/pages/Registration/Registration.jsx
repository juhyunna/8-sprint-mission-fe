import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atom/Button/Button';
import useValidation from '../../lib/hooks/useValidation';
import { createProduct } from '../../lib/api/ProductService';
import './Registration.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const { errors, validateField, validateForm, clearError, isFieldValid } = useValidation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 입력 시 에러 메시지 제거
    if (errors[name]) {
      clearError(name);
    }
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tagInput.trim().length <= 5 && !formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput('');
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.description.trim() && 
           formData.price.trim() && 
           formData.tags.length > 0 &&
           Object.keys(errors).every(key => !errors[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    try {
      const response = await createProduct(
        formData.name,
        formData.description,
        formData.price,
        formData.tags
      );
      
      console.log('상품 등록 성공:', response);
      alert('상품이 성공적으로 등록되었습니다!');
      
      // 상품 상세 페이지로 이동 (빈 페이지)
      navigate(`/product/${response.id}`);
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1>상품 등록</h1>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">상품명 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={!isFieldValid('name') ? 'error' : ''}
              placeholder="상품명을 입력해주세요"
              maxLength={10}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">상품 소개 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={!isFieldValid('description') ? 'error' : ''}
              placeholder="상품에 대한 설명을 입력해주세요"
              rows={5}
              maxLength={100}
            />
            <div className="character-count">
              {formData.description.length}/100
            </div>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">판매 가격 *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={!isFieldValid('price') ? 'error' : ''}
              placeholder="판매 가격을 입력해주세요"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그 *</label>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagAdd}
              placeholder="태그를 입력하고 엔터를 눌러주세요 (5글자 이내)"
              maxLength={5}
            />
            <div className="tags-container">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && <span className="error-message">{errors.tags}</span>}
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/items')}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid()}
            >
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
