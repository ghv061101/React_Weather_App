---
# Weather App

This is a weather forecasting application built using React, Tailwind CSS, and the OpenWeatherMap API. It provides real-time weather updates, forecasts, and weather conditions for different cities. The application allows users to view current weather details, hourly and daily forecasts, and switch between Celsius and Fahrenheit units.

## Features

- Real-Time Weather Data: Displays current weather information including temperature, humidity, wind speed, and more.
- Hourly & Daily Forecasts: Users can view the forecast for the next few hours and days.
- Temperature Units: Toggle between Celsius and Fahrenheit.
- City Selection: Quick access to weather information for popular cities (e.g., Delhi, Mumbai, Chennai).
- Responsive Design: Mobile-friendly and desktop-responsive design using Tailwind CSS.

## Tech Stack

- Frontend: React, Tailwind CSS
- API: OpenWeatherMap API
- State Management: React hooks (`useState`, `useEffect`)

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.x or later)
- OpenWeatherMap API key (sign up [here](https://openweathermap.org/api) if you don't have one)

### Installation

1. Clone the repository:

```bash
(https://github.com/ghv061101/React_Weather_App.git)
```

2. Navigate into the project directory:

```bash
cd weather-app
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file at the root of the project and add your **OpenWeatherMap API key**:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.



### API Integration

The app integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to fetch current weather and forecast data.

To configure the API:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your API key.
2. Add the API key to your `.env` file like this:

```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Runs tests (if any are written).

## Usage

1. Start the app and search for a city in the input box to get real-time weather details.
2. Use the quick city buttons at the top to see the weather for popular cities.
3. Switch between Celsius and Fahrenheit by using the dropdown next to the search bar.
4. View current weather conditions and forecasts for the next few hours and days.





---

