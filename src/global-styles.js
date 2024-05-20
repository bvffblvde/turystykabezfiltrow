import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    font-family: 'Roboto', sans-serif; /* Используйте любой шрифт по вашему выбору */
  }

  .font-default {
    font-size: 16px; /* Размер по умолчанию */
  }

  .font-medium {
    font-size: 18px; /* Размер A++ */
  }

  .font-large {
    font-size: 40px; /* Размер A+++ */
  }

  :root {

    --base-font-size: 16px;
    --large-font-size: 20px;
    --high-contrast-background: #ffffff;
    --high-contrast-text: #000000;
  }

  body {
    font-size: var(--base-font-size);
  }

  .high-contrast {
    background-color: var(--high-contrast-background);
    color: var(--high-contrast-text);
  }
`;

export default function GlobalStyles() {
    return <Global styles={globalStyles} />;
}

