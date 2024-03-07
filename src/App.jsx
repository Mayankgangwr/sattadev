import { useEffect, useState } from "react";
import { addResultInRangeController, darkAdsCardController, lightAdsCardController, gameController, authService, resultChartController } from "./Firestore";
import { login, logout, setDarkCards, setLightCards, setLiveResult, setCurrMonth, setGames } from "./Store";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Home, YearChart, GameChart, Login, Games } from "./Pages";
import { useDispatch } from "react-redux";
import moment from "moment";
import './App.css';
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {

      const userData = await authService.getCurrentUser();
      if (userData) {
        const {
          uid,
          email,
          displayName,
          emailVerified,
          phoneNumber,
          photoURL,
          metadata: { creationTime, lastSignInTime },
          providerData,
          accessToken,
          refreshToken
        } = userData;

        const formattedUserData = {
          uid,
          email,
          displayName,
          emailVerified,
          phoneNumber,
          photoURL,
          metadata: { createdAt: creationTime, lastLoginAt: lastSignInTime },
          providerData: providerData.map(({ providerId, email, displayName, phoneNumber }) => ({
            providerId,
            email,
            displayName,
            phoneNumber
          })),
          accessToken,
          refreshToken
        };

        dispatch(login({ userdata: formattedUserData }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      dispatch(logout());
    }
  };

  const fetchCards = async (controller, dispatchFunction) => {
    try {
      const cards = await controller.getCards();
      const formattedCards = [];
      cards.forEach((card) => {
        formattedCards.push({ cardData: card.data(), id: card.id })
      });
      formattedCards.sort((a, b) => a.cardData.position - b.cardData.position);
      dispatch(dispatchFunction(formattedCards));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const liveResultHandler = async () => {
    try {
      const liveResultStatus = await resultChartController.liveGamesStatus();
      dispatch(setLiveResult(liveResultStatus));
    } catch (error) {
      console.error('Error fetching liveResultStatus:', error);
    }

  }

  const fetchGames = async () => {
    try {
      const games = await gameController.getGames();
      let gamesData = [];
      games.forEach((game) => {
        gamesData.push({ id: game.id, value: game.data() });
      })
      dispatch(setGames(gamesData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getCurrentMonthRestult = async () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const resultsData = await resultChartController.getAllDataForYear(year, month);
    dispatch(setCurrMonth(resultsData));
    try {
      const games = await gameController.getGames();
      let gamesData = [];
      games.forEach((game) => {
        gamesData.push({ id: game.id, value: game.data() });
      })
      dispatch(setGames(gamesData));
    } catch (error) {
      console.error('Error fetching current month restult data:', error);
    }
  }

  const addResultInRange = async () => {
    try {
      let startDate = moment('2024-02-01', 'YYYY-MM-DD').toDate();
      let endDate = moment('2024-03-01', 'YYYY-MM-DD').toDate();
      addResultInRangeController.addResult(startDate, endDate, null);
    } catch (error) {
      console.error('Error fetching current month restult data:', error);
    }

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData();
        await fetchCards(darkAdsCardController, setDarkCards);
        await fetchCards(lightAdsCardController, setLightCards);
        await liveResultHandler();
        await fetchGames();
        await getCurrentMonthRestult();
      } finally {
        setLoading(false); // Set loading to false in the finally block
      }
    };

    fetchData();
  }, []);

  return !loading ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header logo={'./assets/logo.png'} />}>
          <Route index element={<Home />} />
          <Route path="/gamechart/:gamename" element={<GameChart />} />
          <Route path="/yearchart/:year" element={<YearChart />} />
          <Route path="/games" element={<Games />} />
         
          {/* <Route path="/custom" element={
            <AuthLayout authentication={false}>
              <GameResult />
            </AuthLayout>}>
          </Route> */}
        </Route>
         <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  ) : null;
};

export default App;