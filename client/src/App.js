import React from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import withAuthentication from "Components/Session/withAuthentication";
import { theme } from "Components/Styles/theme";
import LandingPage from "Views/Landing/Landing";
import Home from "Views/Home/Home";

const useStyles = makeStyles({
  "@global": {
    html: {
      margin: 0,
      width: "100%",
      height: "100%",
      padding: 0,
      overflowX: "hidden",
    },
    body: {
      margin: 0,
      width: "100%",
      height: "100%",
      padding: 0,
      overflowX: "hidden",
    },
  },
});

const App = () => {
  useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path={["/login", "/register"]} component={LandingPage} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withAuthentication(App);
