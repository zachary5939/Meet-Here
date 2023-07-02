import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import ComputerImage from "../../assets/online_events.svg";
import HandsUp from "../../assets/handsUp.svg";
import Ticket from "../../assets/ticket.svg";
import JoinGroup from "../../assets/joinGroup.svg";

function LandingPage() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  return (
    <div className="landingPage">
      <section className="intro">
        <div className="intro-content">
          <h1>Where interests become friendships</h1>
          <p>
            No matter what your hobbies or interests are, whether it's hiking,
            reading, networking, or sharing skills, there are countless
            individuals who share those interests and are looking to make new
            friends. There are social gatherings taking place every day, so sign
            up and be a part of the excitement of meeting new friends.
          </p>
        </div>
        <div className="image-section">
          <img alt="" src={ComputerImage} />
        </div>
      </section>

      <section className="featurePart">
        <div className="feature-description">
          <h3>How Meet Here Works</h3>
        </div>
        <div className="feature-p">
          <p>
            Meet new people who share your interests through online and
            in-person events. It’s free to create an account.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="feature1">
          <img alt="" src={HandsUp} />
          <h3>See all groups</h3>
          <p>
            Do what you love, meet others who love it, find your community. The
            rest is history!
          </p>
        </div>
        <div className="feature2">
          <img alt="" src={Ticket} />
          <h3>Find an event</h3>
          <p>
            Events are happening on just about any topic you can think of, from
            online gaming and photography to yoga and hiking.
          </p>
        </div>
        <div className={`feature3${user ? "" : " disabled"}`}>
          <img alt="" src={JoinGroup} />
          <h3 className={user ? "" : "disabled-text"}>Start a new group</h3>
          {user ? (
            <p>
              You don’t have to be an expert to gather people together and explore
              shared interests.
            </p>
          ) : (
            <p className="disabled-text">
              You don’t have to be an expert to gather people together and explore
              shared interests.
            </p>
          )}
        </div>
      </section>

      <section className="join-section">
        <button className="join-button">Join Meetup</button>
      </section>
    </div>
  );
}

export default LandingPage;
