import { Card } from "react-bootstrap";
import LoginButton from "../Buttons/LoginButton";
import HomeCardButton from "../Buttons/HomeCardButton";
import homecardimg from "../../images/homecard.jpg";
import "./styles.css";

function HomeCard({ loggedIn }) {
  return (
    <Card className="homecard text-center text-white border-0 my-4 mx-5">
      <Card.Img
        src={homecardimg}
        alt="Spotify Genres"
        className="homecard-img"
      />
      <Card.ImgOverlay className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <Card.Title className="card-title border-0 mt-2">statify</Card.Title>
          <Card.Body className="homecard-body border-0 d-flex flex-column align-items-center">
            {loggedIn ? (
              // <div className="w-100">
              //   <HomeCardButton variant="tracks" mb={3}/>
              //   <HomeCardButton variant="artists" />
              // </div>
              <>
                <HomeCardButton variant="tracks" mb={3} />
                <HomeCardButton variant="artists" />
              </>
            ) : (
              <>
                <Card.Text className="card-text">login to view more</Card.Text>{" "}
                <LoginButton />
              </>
            )}
          </Card.Body>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}

export default HomeCard;
