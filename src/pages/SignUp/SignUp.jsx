import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    if (!email) return "이메일을 입력해주세요.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validateNickname = (nickname) => {
    if (!nickname) return "닉네임을 입력해주세요.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return "비밀번호 확인을 입력해주세요.";
    if (confirmPassword !== formData.password)
      return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "nickname") {
      error = validateNickname(value);
    } else if (name === "password") {
      error = validatePassword(value);
    } else if (name === "confirmPassword") {
      error = validateConfirmPassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.nickname &&
      formData.password &&
      formData.confirmPassword &&
      !errors.email &&
      !errors.nickname &&
      !errors.password &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const existingUser = USER_DATA.find((u) => u.email === formData.email);

    if (existingUser) {
      alert("사용 중인 이메일입니다.");
      return;
    }

    // 회원가입 성공 시 로그인 페이지로 이동
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <Link to="/" className="logo-link">
          <img
            src="./images/pandalogo-sm.svg"
            alt="판다마켓"
            className="logo"
          />
          <span className="logo-text">판다마켓</span>
        </Link>

        <form onSubmit={handleSubmit} className="signup-form">
          <h1>회원가입</h1>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email ? "error" : ""}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.nickname ? "error" : ""}
              placeholder="닉네임을 입력해주세요"
            />
            {errors.nickname && (
              <span className="error-message">{errors.nickname}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.password ? "error" : ""}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "error" : ""}
                placeholder="비밀번호를 다시 입력해주세요"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={`signup-btn ${!isFormValid() ? "disabled" : ""}`}
            disabled={!isFormValid()}
          >
            회원가입
          </button>
        </form>

        <div className="login-link">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>

        <div className="social-login">
          <p>소셜 로그인</p>
          <div className="social-buttons">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/google.svg" alt="Google" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/kakao.svg" alt="Kakao" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
