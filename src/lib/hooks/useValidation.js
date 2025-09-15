import { useState, useCallback } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateName = useCallback((name) => {
    if (!name || !name.trim()) {
      return '상품명을 입력해주세요.';
    }
    if (name.trim().length < 1 || name.trim().length > 10) {
      return '상품명은 1자 이상, 10자 이내로 입력해주세요.';
    }
    return '';
  }, []);

  const validateDescription = useCallback((description) => {
    if (!description || !description.trim()) {
      return '상품 소개를 입력해주세요.';
    }
    if (description.trim().length < 10 || description.trim().length > 100) {
      return '상품 소개는 10자 이상, 100자 이내로 입력해주세요.';
    }
    return '';
  }, []);

  const validatePrice = useCallback((price) => {
    if (!price || !price.trim()) {
      return '판매 가격을 입력해주세요.';
    }
    if (!/^\d+$/.test(price.trim())) {
      return '판매 가격은 숫자로만 입력해주세요.';
    }
    return '';
  }, []);

  const validateTags = useCallback((tags) => {
    if (!tags || tags.length === 0) {
      return '태그를 최소 1개 이상 입력해주세요.';
    }
    return '';
  }, []);

  const validateTagInput = useCallback((tagInput) => {
    if (tagInput && tagInput.length > 5) {
      return '태그는 5글자 이내로 입력해주세요.';
    }
    return '';
  }, []);

  const validateField = useCallback((fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        error = validateName(value);
        break;
      case 'description':
        error = validateDescription(value);
        break;
      case 'price':
        error = validatePrice(value);
        break;
      case 'tags':
        error = validateTags(value);
        break;
      case 'tagInput':
        error = validateTagInput(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  }, [validateName, validateDescription, validatePrice, validateTags, validateTagInput]);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    
    newErrors.name = validateName(formData.name);
    newErrors.description = validateDescription(formData.description);
    newErrors.price = validatePrice(formData.price);
    newErrors.tags = validateTags(formData.tags);

    setErrors(newErrors);
    return Object.keys(newErrors).every(key => newErrors[key] === '');
  }, [validateName, validateDescription, validatePrice, validateTags]);

  const clearError = useCallback((fieldName) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = useCallback(() => {
    return Object.values(errors).some(error => error !== '');
  }, [errors]);

  const isFieldValid = useCallback((fieldName) => {
    return !errors[fieldName] || errors[fieldName] === '';
  }, [errors]);

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearAllErrors,
    hasErrors,
    isFieldValid
  };
};

export default useValidation;
