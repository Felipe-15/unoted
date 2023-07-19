import "../src/app/globals.css";
import type { Preview } from "@storybook/react";
import { mukta } from "../src/app/fonts";

export const parameters = {
  nextjs: {
    router: {
      path: "/default-path",
      asPath: "/default-path",
      query: {},
    },
    appDirectory: true,
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => <div className={`${mukta.className}`}>{Story()}</div>,
  ],
};

export default preview;
