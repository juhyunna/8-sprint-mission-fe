import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    if (!email) return "이메일을 입력해주세요.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
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
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      formData.email && formData.password && !errors.email && !errors.password
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const user = USER_DATA.find((u) => u.email === formData.email);

    if (!user || user.password !== formData.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 로그인 성공 시 /items로 이동
    navigate("/items");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Link to="/" className="logo-link">
          <img
            src="./images/pandalogo-sm.svg"
            alt="판다마켓"
            className="logo"
          />
          <span className="logo-text">판다마켓</span>
        </Link>

        <form onSubmit={handleSubmit} className="login-form">
          <h1>로그인</h1>

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

          <button
            type="submit"
            className={`login-btn ${!isFormValid() ? "disabled" : ""}`}
            disabled={!isFormValid()}
          >
            로그인
          </button>
        </form>

        <div className="signup-link">
          <span>계정이 없으신가요?</span>
          <Link to="/signup">회원가입</Link>
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

export default Login;
