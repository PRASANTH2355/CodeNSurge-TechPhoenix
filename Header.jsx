import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './header.css';

const API_KEY = "0018bfe9d1bf019607e9124ab361baf0";

function Header() {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Update body class based on theme
  useEffect(() => {
    document.body.className = theme === "light" ? "" : "dark";
  }, [theme]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen((prevSidebar) => !prevSidebar);
  };

  // Fetch weather data based on city
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  const categories = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sport",
    "Technology",
    "Politics",
  ];
  return (
    <header>
      <nav>
        <span className="logo">
          <img src={logo} alt="News Waves Logo" />
        </span>
        <div className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </div>
        <ul className={`nav-ul ${sidebarOpen ? "active" : ""}`}>
          <li>
            <Link className="button-link" to="/" onClick={toggleSidebar}>
              ALL NEWS
            </Link>
          </li>
          <li>
            <Link className="button-link" to="/search" onClick={toggleSidebar}>
              SEARCH
            </Link>
          </li>
          <li className="dropdown-li">
            <span className="dropdown-title">Top-Headlines</span>
            <ul className="dropdown-content">
              <li>
                <Link className="button-link" to="/top-headlines/business" onClick={toggleSidebar}>
                  Business
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/sports" onClick={toggleSidebar}>
                  Sports
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/technology" onClick={toggleSidebar}>
                  Technology
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/general" onClick={toggleSidebar}>
                  General
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/health" onClick={toggleSidebar}>
                  Health
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/politics" onClick={toggleSidebar}>
                  Politics
                </Link>
              </li>
              <li>
                <Link className="button-link" to="/top-headlines/entertainment" onClick={toggleSidebar}>
                  Entertainment
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <form onSubmit={handleSearch} className="weather-form">
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={handleCityChange}
                className="city-input"
              />
              <button type="submit" className="weather-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </li>

          {weatherData && (
            <li className="weather-info">
              <span>{weatherData.name}</span>
              <span>{Math.round(weatherData.main.temp)}°C</span>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <span>{weatherData.weather[0].main}</span>
            </li>
          )}

          <li>
            <div className="theme-toggle">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                {theme === "light" ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
                <span className="ball"></span>
              </label>
            </div>
          </li>
          <li>
            <Link to="/login" className="login-button" onClick={toggleSidebar}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={`overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </header>
  );
}

export default Header;
