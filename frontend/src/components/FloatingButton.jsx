import React from 'react';
import '@stylesComponents/FloatingButton.scss';
import { BiPlusMedical } from "react-icons/bi";

const FloatingButton = () => {
  return (
    <a className="button is-primary is-rounded floating-btn" href="/createevent">
      <BiPlusMedical/>
    </a>
  );
};

export default FloatingButton;
