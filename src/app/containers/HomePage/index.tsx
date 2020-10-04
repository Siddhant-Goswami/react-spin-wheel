import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Wheel } from 'app/components/Wheel/Loadable';

export function HomePage() {
  const wheelItems = [
    'Rs 50',
    'Better luck next time',
    '2X Savings',
    'Rs 100 Cashback',
    'Rs 20',
    'Rs 50',
    '1.5X Savings',
    '2X Savings',
  ];
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div>
        <Wheel items={wheelItems} />
      </div>
    </>
  );
}
