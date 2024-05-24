import { Global, css } from '@emotion/react';

const globalStyles = css`

  .font-default {
    font-size: 16px; /* Размер по умолчанию */
  }

  .font-medium {
    font-size: 18px; /* Размер A++ */
  }

  .font-large {
    font-size: 40px; /* Размер A+++ */
  }
`;

export default function GlobalStyles() {
    return <Global styles={globalStyles} />;
}

