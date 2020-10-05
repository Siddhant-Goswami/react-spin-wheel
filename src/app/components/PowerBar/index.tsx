/**
 *
 * PowerBar
 *
 */
import React from 'react';
import './powerBar.css';
import { ReactComponent as Power } from './power.svg';

interface Props {}

export function PowerBar(props: Props) {
  return <div className="powerbar-container">
  <Power></Power>
</div>;
}
