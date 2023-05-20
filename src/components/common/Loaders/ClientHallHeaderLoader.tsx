import React from 'react';
import ContentLoader from 'react-content-loader';

export const ClientHallHeaderLoader = (props: any) => (
  <ContentLoader speed={2} width={990} height={97} viewBox='0 0 990 97' backgroundColor='#bbb6b3f2' foregroundColor='#dbd6d1f2' {...props}>
    <rect x='15' y='15' rx='3' ry='3' width='231' height='19' />
    <rect x='15' y='40' rx='3' ry='3' width='136' height='16' />
    <rect x='15' y='63' rx='3' ry='3' width='114' height='18' />
  </ContentLoader>
);
