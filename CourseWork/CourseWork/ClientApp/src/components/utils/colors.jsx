import { css } from "styled-components";

export const headerLink = "#3B4856";
export const mainColor = "#005683";
export const lightMainColor = "#3F6098";
export const langColor = "#00A2A7";
export const lightGray = "#D9D9D9";
export const colorHoverHeader = css`
  background: radial-gradient(
        circle,
        ${mainColor} 28%,
        ${mainColor} 53%,
        ${mainColor} 100%
      )
      var(--c, 0%) / 200% 100%,
    radial-gradient(
        circle,
        ${mainColor} 28%,
        ${mainColor} 53%,
        ${mainColor} 100%
      )
      0% 100% / var(--c, 0%) 0.15em no-repeat;
`;
