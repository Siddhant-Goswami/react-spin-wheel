import React from 'react';
import { Helmet } from 'react-helmet-async';

import wheelItems from './WheelItems';
import { Wheel } from 'app/components/Wheel/Loadable';
import { Content } from 'app/components/Content/Loadable';
import { PowerBar } from 'app/components/PowerBar/Loadable';

export function HomePage() {
  const renderHeader = ()=>{
    return <Helmet>
    <title>Home Page</title>
    <meta name="description" content="Spin wheel homepage" />
  </Helmet>
  }
  return (
    <>
      {renderHeader()}
      <div style={{ padding: '25px 0' }}>
        <Wheel items={wheelItems} />
        <PowerBar/>
        <Content/>
      </div>
    </>
  );
}
