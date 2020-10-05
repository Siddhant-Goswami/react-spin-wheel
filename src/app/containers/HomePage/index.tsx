import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Wheel } from 'app/components/Wheel/Loadable';
import wheelItems from './WheelItems';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Spin wheel homepage" />
      </Helmet>
      <div style={{ padding: '25px 0' }}>
        <Wheel items={wheelItems} />
      </div>
    </>
  );
}
