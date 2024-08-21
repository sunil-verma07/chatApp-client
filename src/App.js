import React from "react";
import Notebook from "./pages/Notebook.js";
import LandingScreen from "./pages/LandingScreen.js";
import AuthScreen from './pages/AuthScreen.js';
import MainScreen from './pages/MainScreen.js';
import Navbar from './components/Navbar.js'
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import './App.css'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import fileReducer from './store/reducers/fileReducer.js';
import notebookReducer from './store/reducers/notebookReducer.js';
import chatReducer from './store/reducers/chatReducer.js';
const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});


const store = configureStore({
  reducer: {
    files: fileReducer,
    notebook:notebookReducer,
    chats:chatReducer
 
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const App = () => {
  return (
    <Provider store={store}>
    <ChakraBaseProvider theme={theme}>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<MainScreen/>}/>
          <Route path="/auth" element={<AuthScreen/>}/>
        <Route path="/home" element={<LandingScreen />} />
        <Route path="/notebook/:id" element={<Notebook />} />
        </Routes>
      </Router>
    </ChakraBaseProvider>
    </Provider>

  );
};

export default App;
