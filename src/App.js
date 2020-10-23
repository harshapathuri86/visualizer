import React from 'react';
import Index from './utils/index'
import { Route } from 'react-router-dom';
import Dijkstra from './graphalgorithms/dijkstra/dijkstra';
// import Search from './searchingalorithms/searchingvisualiser'
// import Sort from './sortingalgorithms/sortingvisualiser'
import './App.css';
// import { ThemeProvider } from 'styled-components';
// import { useDarkMode } from './useDarkmode';
// import { lightTheme, darkTheme } from './theme';
// import { GlobalStyles } from './global';
// import Toggle from './utils/toggle';


export default function App() {
  // const [theme, toggleTheme, componentMounted] = useDarkMode();
  // const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // if (!componentMounted) {
  //   return <div />
  // };
  return (
    // <ThemeProvider theme={themeMode}>
    < >
      {/* <GlobalStyles /> */}
      {/* <Toggle theme={theme} toggleTheme={toggleTheme} /> */}
      <Route exact path="/" component={Index} />
      {/* <Route path="/sort" component={Sort} /> */}
      {/* <Route path="/search" component={Search} /> */}
      <Route path="/dijkstra" component={Dijkstra} />
      <h6>Algorithm Visualizer you can see this in every page</h6>
    </>
    // </ThemeProvider>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
