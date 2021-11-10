import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import homeImage from "./images/Home.png";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample({catchList}) {
  return (
    <Router>
      <div>
          <Link to="/home"><img classname="topIcon" src={homeImage} alt={"home search"}/></Link>
          <Link to="/caught">caught</Link>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/caught">
            <Caught catchList={catchList}/>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
    </div>
  );
}

function Caught({catchList}) {
    console.log("catchList")
    console.log(catchList)
  return (
    <ul>
       { catchList.map((pokemon) =><li>{pokemon.name}</li>)}
    </ul>
    );
}


