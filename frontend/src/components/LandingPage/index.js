import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

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
          <img
            src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"
            alt="Static Image from Meetup"
          />
        </div>
      </section>

      <section className="featurePart">
        <div className="feature-description">
          <h3>How meetup works</h3>
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
          <img
            src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256"
            alt="Hand Clapping"
          ></img>
          <h3>Join a group</h3>
          <p>
            Do what you love, meet others who love it, find your community. The
            rest is history!
          </p>
        </div>
        <div className="feature2">
          <img
            src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256"
            alt="Ticket"
          ></img>
          <h3>Find an event</h3>
          <p>
            Events are happening on just about any topic you can think of, from
            online gaming and photography to yoga and hiking.
          </p>
        </div>
        <div className="feature3">
          <img
            src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256"
            alt="People"
          ></img>
          <h3>Start a new group</h3>
          <p>
            You don’t have to be an expert to gather people together and explore
            shared interests.
          </p>
        </div>
      </section>

      <section className="join-section">
        <button className="join-button">Join Meetup</button>
      </section>
    </div>
  );
}

export default LandingPage;
