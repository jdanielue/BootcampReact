import React, {useState} from "react";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import homeImage from "./images/Home.png";

export default function BasicExample() {
  const [catchList, setCatchList] = useState([])
  return (
    <Router>
      <div>
          <Link to="/home"><img classname="topIcon" src={homeImage} alt={"home search"}/></Link>
          <Link to="/caught">caught</Link>
        <Switch>
          <Route path="/caught">
            <Caught catchList={catchList}/>
          </Route>
          <Route path="/home">
            <Home setCatchList={setCatchList}/>
          </Route>
        </Switch>
      </div>
    </Router>
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
