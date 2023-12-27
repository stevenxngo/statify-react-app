import { Card } from "react-bootstrap";
import LoginButton from "../Buttons/LoginButton";
import HomeCardButton from "../Buttons/HomeCardButton";
import homecardimg from "../../images/homecard.jpg";
import "./styles.css";

function HomeCard({ loggedIn }) {
  return (
    <Card className="homecard mt-4">
      <Card.Img
        src={homecardimg}
        alt="Spotify Genres"
        className="homecard-img"
        loading="lazy"
      />
      <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-around">
        <Card.Title>statify</Card.Title>
        {loggedIn ? (
            <div className="mb-2 homecard-btns">
              <HomeCardButton variant="tracks" className="mb-2"/>
              <HomeCardButton variant="artists" className="mb-2"/>
              <HomeCardButton variant="genres" />
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
