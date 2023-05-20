import React from 'react';
import ContentLoader from 'react-content-loader';

export const ClientFilmLoader = (props: any) => {
  return (
    <ContentLoader speed={2} width={990} height={320} viewBox='0 0 990 320' backgroundColor='#e1d1c3' foregroundColor='#d3c9c1' {...props}>
      <rect x='0' y='0' rx='0' ry='0' width='125' height='175' />
      <rect x='140' y='33' rx='0' ry='0' width='231' height='15' />
      <rect x='140' y='60' rx='0' ry='0' width='349' height='15' />
      <rect x='140' y='110' rx='0' ry='0' width='128' height='25' />
      <rect x='0' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='70' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='140' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='210' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='280' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='350' y='235' rx='0' ry='0' width='50' height='25' />
      <rect x='0' y='280' rx='0' ry='0' width='50' height='25' />
      <rect x='70' y='280' rx='0' ry='0' width='50' height='25' />
      <rect x='140' y='280' rx='0' ry='0' width='50' height='25' />
    </ContentLoader>
  );
};
