import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import GroupsPage from "./components/Groups";
import GroupDetails from "./components/GroupDetails";
import Events from "./components/Events";
import EventDetail from "./components/EventDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/groups" component={GroupsPage} />
          <Route path="/groups/:groupId" component={GroupDetails}/>
          <Route exact path="/events" component={Events}/>
          <Route path="/events/:eventId" component={EventDetail}/>
        </Switch>
      )}
    </>
  );
}

export default App;
