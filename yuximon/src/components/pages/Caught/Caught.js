import { Fragment } from "react";
import { Link } from "react-router-dom";
import  styles from "./caught.module.scss";
import homeImage from "../../../images/Home.png";

function Caught({ catchList }) {
  console.log("catchList");
  console.log(catchList);
  return (
    <Fragment className={styles.Body}>
          <div className="topBox">
            <Link to="/home">
              <img classname="topIcon" src={homeImage} alt={"home search"} />
            </Link>
          </div>
      <ul>
        {catchList.map((pokemon) => (
          <li> {pokemon.id} - {pokemon.name}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default Caught;
