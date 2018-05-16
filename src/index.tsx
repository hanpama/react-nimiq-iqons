import * as React from 'react';

import { catalogue } from './catalogue';


export interface IqonProps extends React.SVGProps<any> {
  address: string;
};

export function Iqon({ address, ...props }: IqonProps) {
  const hash = addressToHash(address);

  let color = parseInt(hash[0]);
  let backgroundColor = parseInt(hash[2]);
  const faceNr = parseInt(hash[3] + hash[4]);
  const topNr = parseInt(hash[5] + hash[6]);
  const sideNr = parseInt(hash[7] + hash[8]);
  const bottomNr = parseInt(hash[9] + hash[10]);
  let accentColor = parseInt(hash[11]);

  if (color === backgroundColor)
    if (++color > 9) color = 0;

  while (accentColor === color || accentColor === backgroundColor)
    if (++accentColor > 9) accentColor = 0;

  const Top = catalogue.Top[topNr % catalogue.Top.length];
  const Face = catalogue.Face[faceNr % catalogue.Face.length];
  const Bottom = catalogue.Bottom[bottomNr % catalogue.Bottom.length];
  const Side = catalogue.Side[sideNr % catalogue.Side.length];

  const clipId = 'hexagon-clip-' + address.replace(/ /g,'');

  return (
    <svg
      viewBox='0 0 160 160'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <defs>
          <clipPath id={clipId} transform='matrix(.5 0 0 .5 0 8)'>
              <path d='M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z'
              />
          </clipPath>
      </defs>
      <path fill='#fff' stroke='#bbb' transform='matrix(.5 0 0 .5 0 8)' d='M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z'
      />
      <g clipPath={`url(#${clipId})`} transform='matrix(.9 0 0 .9 8.1 7.2)'>
          <g color={COLORS[color]} fill={COLORS[accentColor]}>
              <rect fill={COLORS[backgroundColor]} width='160' height='160' />
              <circle cx='80' cy='80' r='40' fill={COLORS[color]} />
              <path d='M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z'
              opacity='0.1' fill='#010101' />
              <Top />
              <Side />
              <Face />
              <Bottom />
          </g>
      </g>
  </svg>
  );
}

const COLORS = [
  '#fb8c00', // orange-600
  '#d32f2f', // red-700
  '#fbc02d', // yellow-700
  '#3949ab', // indigo-600
  '#03a9f4', // light-blue-500
  '#8e24aa', // purple-600
  '#009688', // teal-500
  '#f06292', // pink-300
  '#7cb342', // light-green-600
  '#795548'  // brown-400
]

function addressToHash(address: string) {
  return (
    '' + address
      .split('')
      .map(c => Number(c.charCodeAt(0)) + 3)
      .reduce((a, e) => a * (1 - a) * chaosHash(e), 0.5))
      .split('')
      .reduce((a, e) => e + a, '')
      .substr(4, 17);
}

function chaosHash(number: number) {
  const k = 3.569956786876;
  let a_n = 1 / number;
  for (let i = 0; i < 100; i++) {
    a_n = (1 - a_n) * a_n * k;
  }
  return a_n;
}
