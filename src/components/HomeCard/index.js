import { Card } from "react-bootstrap";
import LoginButton from "../Buttons/LoginButton";
import HomeCardButton from "../Buttons/HomeCardButton";
import homecardimg from "../../images/homecard.jpg";
import "./styles.css";

function HomeCard({ loggedIn }) {
  return (
    <Card className="homecard mt-4 mx-3 mx-sm-0 mx-md-0 mx-lg-0 mx-xl-0">
      <Card.Img
        src={homecardimg}
        alt="Spotify Genres"
        className="homecard-img"
      />
      <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-around">
        <Card.Title>statify</Card.Title>
        {loggedIn ? (
            <div className="mb-2 homecard-btns">
              <HomeCardButton variant="tracks" className="mb-3"/>
              <HomeCardButton variant="artists" />
            </div>
          ) : (
            <div className="mb-2 d-flex flex-column homecard-btns align-items-center justify-content-center">
              <Card.Text className="mb-3 homecard-login-text">login to view more</Card.Text>{" "}
              <LoginButton />
            </div>
          )}
      </Card.ImgOverlay>
    </Card>
  );
}

export default HomeCard;
