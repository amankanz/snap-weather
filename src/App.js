// weather API Key
// 54730632bf3873e3879ae4a3a5351e06

import { useState, useEffect } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function App() {
  return (
    <>
      <MainContent />
      <Footer />
    </>
  );
}

function MainContent() {
  const [loading, setLoading] = useState(false);
  const [searchBarContent, setSearchBarContent] = useState("");
  const [city, setCity] = useState("");
  const [tempImg, setTempImg] = useState(null);
  const [description, setDescription] = useState("");
  const [tem, setTemp] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempMin, setTempMin] = useState("");

  function handleSearchBarContent(value) {
    setSearchBarContent(value);
  }

  function loadingLoader() {
    setLoading(true);
  }
  function completeLoading() {
    setLoading(false);
  }

  async function handleGetWeather(e) {
    e.preventDefault();
    handleReset();

    const apiKey = "54730632bf3873e3879ae4a3a5351e06";

    const cityName = searchBarContent.trim();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    loadingLoader();
    if (!cityName) {
      setCity(`No city given`);
      completeLoading();
      return;
    }
    try {
      const weatherDataFetched = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      const weatherData = await weatherDataFetched.json();
      console.log(weatherData);

      setCity(`${!weatherData.name ? weatherData.message : weatherData.name}`);

      if (weatherData.cod === "404") {
        completeLoading();
      }

      setTempImg(weatherData.weather?.at(0).icon);
      setDescription(`${weatherData.weather.at(0).main}`);
      setTemp(`${Math.round(weatherData.main.temp)}°C`);
      setTempMax(`${weatherData.main.temp_max}°C`);
      setTempMin(`${weatherData.main.temp_min}°C`);

      completeLoading();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function handleReset() {
    setLoading(false);
    setSearchBarContent("");
    setCity("");
    setTempImg(null);
    setDescription("");
    setTemp("");
    setTempMax("");
    setTempMin("");
  }

  return (
    <main id="app">
      <Form
        searchBarContent={searchBarContent}
        onSearchBarContent={handleSearchBarContent}
        onGetWeather={handleGetWeather}
        onReset={handleReset}
      />

      {/* Date & City */}
      <SectionData id="info">
        <CurrentDate />
        <h3 id="city">{city ? city : "Search city"}</h3>
      </SectionData>

      <div
        id="loader"
        className="loader"
        style={loading ? { display: "block" } : { display: "none" }}
      ></div>

      {/* weather image */}
      <SectionData id="tempImg">
        <img
          src={`https://openweathermap.org/img/wn/${tempImg}@2x.png`}
          alt="Weather Icon"
          style={tempImg ? { display: "inline-block" } : { display: "none" }}
        />
      </SectionData>

      {/* Description */}
      <SectionData id="description">{description}</SectionData>

      {/* Temp */}
      <SectionData id="temp">
        <h2 id="temp">{tem}</h2>
      </SectionData>

      {/* Extra Info */}
      <SectionData id="extraInfo">
        <div className="col">
          <div className="info">
            <h5>Highs</h5>
            <p id="tempMax">{tempMax}</p>
          </div>
        </div>

        <div className="col">
          <div className="info">
            <h5>Lows</h5>
            <p id="tempMin">{tempMin}</p>
          </div>
        </div>
      </SectionData>
    </main>
  );
}

function Form({ searchBarContent, onSearchBarContent, onGetWeather, onReset }) {
  return (
    <form id="searchBar">
      <button id="clearBtn" type="reset" onClick={onReset}>
        <i className="fa-solid fa-x"></i>
      </button>
      <input
        type="text"
        id="searchBarInput"
        value={searchBarContent}
        placeholder="Search by city"
        onChange={(e) => onSearchBarContent(e.target.value)}
      />
      <button id="searchBtn" type="submit" onClick={onGetWeather}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

function CurrentDate() {
  const [curDate, setCurDate] = useState("");

  useEffect(() => {
    let dateObj = new Date();
    let month = months.at(dateObj.getUTCMonth());
    let dayDate = dateObj.getUTCDate();
    let day = daysOfWeek.at(dateObj.getUTCDay());
    let year = dateObj.getUTCFullYear();

    // console.log(dateObj);
    console.log(`${day}, ${dayDate} ${month} ${year}`);

    setCurDate(`${day}, ${dayDate} ${month} ${year}`);
  }, []);
  return <p id="date">{curDate}</p>;
}

function SectionData({ id, children }) {
  return <section id={id}>{children}</section>;
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy;{" "}
        <a
          href="https://kanezaio.netlify.app/#intro"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kaneza
        </a>{" "}
        2024
      </p>
    </footer>
  );
}
