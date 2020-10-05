/**
*
* Content
*
*/
import React from 'react';
import './content.css';

interface Props {}

export function Content(props: Props) {

  return (
    <>
    <div className="spin-message-div">
    <h1>Spin the wheel now and get rewarded</h1>
    <p>Tap on Spin or rotate the wheel anti-clockwise direction and release to start spinning</p>
    </div>
    <p className="question">Have a question?<span> Get help</span></p>
</>
  );

};

