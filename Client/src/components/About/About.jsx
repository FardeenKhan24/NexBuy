import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { FaReact } from "react-icons/fa6";
import { SiRedux } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const About = () => {
  return (
    <div className="about-container">
      <div className="about">
        <h1>About Developer</h1>
        <p>
          Hello there! I'm <span>Fardeen Khan</span>, the passionate developer
          behind this website. With a strong focus on detail and a commitment to
          crafting seamless digital experiences, I set out to create a unique
          and user-friendly online shopping platform.
        </p>
        <h1>Frameworks and Technologies Used</h1>
        <p>
          In the development of this website, I've harnessed the power of the
          following frameworks and technologies to create a modern, single-page
          application (SPA):
        </p>
        <div className="react-icos">
          <div className="icon-block">
            <FaReact className="react-ico" />
            <p>React</p>
          </div>
          <div className="icon-block">
            <SiRedux className="react-ico" />
            <p>Redux</p>
          </div>
        </div>

        <h1>A Glimpse into the Backend:</h1>
        <p>
          I specialize in full-stack development, utilizing Node.js, Express.js,
          and MongoDB on the backend to implement secure user registration,
          login, and authentication, along with features like product
          management, cart functionality, and order history to enhance the
          overall shopping experience.
        </p>
        <div className="all-icos">
          <div className="icon-block">
            <FaNode className="node-ico" />
            <p>Node</p>
          </div>
          <div className="icon-block">
            <SiExpress className="express-ico" />
            <p>Express</p>
          </div>
          <div className="icon-block">
            <BiLogoMongodb className="mongo-icon" />
            <p>MongoDB</p>
          </div>
        </div>
        <h1>Let's Connect</h1>
        <p>
          Feel free to explore the website and discover all the great offerings.
          If you have any questions, feedback, or suggestions, I’m always here
          to help. Your experience means a lot—happy shopping and enjoy the
          journey!
        </p>
        <div className="react-icos">
          <div className="icon-block">
            <Link
              to="https://www.linkedin.com/in/fardeen-khan-0a7844264/"
              className="linkedin-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
            <p>LinkedIn</p>
          </div>
          <div className="icon-block">
            <Link
              to="https://github.com/FardeenKhan24/NexBuy"
              className="git-ico"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
            <p>GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
