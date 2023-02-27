import { css } from "styled-components";

const size = {
  mobileS: "280px",
  mobileM: "320px",
  mobileL: "576px",
  tablet: "768px",
  laptop: "992px",
  laptopL: "1200px",
  desktop: "1400px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const FontInterSBold = css`
  font-family: "Inter", sans-serif;
  font-style: semi-bold;
  font-weight: 500;
`;
export const FontInter = css`
  font-family: "Inter", sans-serif;
  font-style: normal;
`;
