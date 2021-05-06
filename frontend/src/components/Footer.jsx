import React from 'react';
import '@stylesComponents/Footer.scss';
import { FaCopyright } from "react-icons/fa";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className='has-background-primary has-text-light has-text-weight-bold footer'>
      <div className="is-flex is-align-items-center is-flex-direction-row is-justify-content-space-around py-6">
        <div className="is-flex is-align-items-center">
          <FaCopyright/>Copyright 2021
        </div>
        <div className="is-flex is-align-items-center">
          <div className="">
            <div className="is-flex is-align-items-center">
              Aura Pasmin&nbsp;
              <AiFillLinkedin onClick={ () => {location.href = 'https://www.linkedin.com/in/aura-pasmin-url/'}} className="pointer-btn"/>
              <AiFillGithub onClick={ () => {location.href = "https://github.com/auraPasmin"}} className="pointer-btn"/>
            </div>
            <div className="is-flex is-align-items-center">
              Carlos Cortez&nbsp;
              <AiFillLinkedin onClick={ () => {location.href = "https://www.linkedin.com/in/kaelwebdev/"}} className="pointer-btn"/>
              <AiFillGithub onClick={ () => {location.href = "https://github.com/kaelwebdev"}} className="pointer-btn"/>
            </div>
            <div className="is-flex is-align-items-center">
              Felipe Satizabal&nbsp;
              <AiFillLinkedin onClick={ () => {location.href = "https://www.linkedin.com/in/felipesatizabal"}} className="pointer-btn"/>
              <AiFillGithub onClick={ () => {location.href = "https://github.com/felipesv"}} className="pointer-btn"/>
            </div>
            <div className="is-flex is-align-items-center">
              Jorge Chaux&nbsp;
              <AiFillLinkedin onClick={ () => {location.href = "https://co.linkedin.com/in/jorgechauxjr"}} className="pointer-btn"/>
              <AiFillGithub onClick={ () => {location.href = "https://github.com/jorgechauxjr"}} className="pointer-btn"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
