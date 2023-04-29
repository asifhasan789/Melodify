import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import AddIcon from "@material-ui/icons/Add";
import {
  faHome,
  faList,
  faMusic,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./logo.png";

function Navbarcomp() {
  return (
    <Navbar className="navbar">
      <Container className="container">
        <Navbar.Brand className="navbrand">
          <img src={logo} width="120" height="40" className="" alt="" />
          &nbsp;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav_links">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              {" "}
              <FontAwesomeIcon icon={faHome} id="afont" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/my-tokens">
              <FontAwesomeIcon icon={faMusic} id="afont" />
              My Music
            </Nav.Link>
            <Nav.Link as={Link} to="/my-resales">
              <FontAwesomeIcon icon={faList} id="afont" />
              My Resales
            </Nav.Link>
            <Nav.Link as={Link} to="/my-resales">
              <FontAwesomeIcon icon={faSearch} id="afont" />
              Search
            </Nav.Link>
          </Nav>
          <br />
          <div className="playlist">
            <div className="heading">
              <strong>PLAYLISTS</strong>
              <AddIcon />
            </div>
            <a href="youtube.com">
              <QueueMusicIcon /> Rock
            </a>
            <a href="youtube.com">
              <QueueMusicIcon /> Hip Hop
            </a>
            <a href="youtube.com">
              <QueueMusicIcon /> Mumble
            </a>
            <a href="youtube.com">
              <QueueMusicIcon /> Melody
            </a>
            <a href="youtube.com">
              <QueueMusicIcon /> Band
            </a>
          </div>
          <Nav className="na_footer">
            <div className="footer">
              <div className="foot" id="foot">
                <div className="footlink">
                  <a
                    className="links"
                    href="https://www.spotify.com/in-en/legal/end-user-agreement/"
                  >
                    Legal
                  </a>
                </div>
                <div className="footlink">
                  <a
                    className="links"
                    href="https://www.spotify.com/in-en/privacy"
                  >
                    Pivacy Center
                  </a>
                </div>
                <div className="footlink">
                  <a
                    className="links"
                    href="https://www.spotify.com/in-en/legal/privacy-policy/"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className="footlink">
                  <a
                    className="links"
                    href="https://www.spotify.com/in-en/legal/cookies-policy/"
                  >
                    Cookies
                  </a>
                </div>
                <div className="footlink">
                  <a
                    className="links"
                    href="https://www.spotify.com/in-en/legal/about-ads/"
                  >
                    About Ads
                  </a>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbarcomp;
