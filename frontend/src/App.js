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
import CreateGroup from "./components/CreateGroup";
import CreateEvent from "./components/CreateEvent";

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
          <Route exact path="/groups/new" component={CreateGroup} />
          <Route path="/groups/:groupId" component={GroupDetails} />
          <Route exact path = '/groups/:groupId/newEvent'component={CreateEvent} />
          <Route exact path="/events" component={Events} />
          <Route path="/events/:eventId" component={EventDetail} />
        </Switch>
      )}
    </>
  );
}

export default App;
