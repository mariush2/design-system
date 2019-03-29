import { makeColorToken } from "../transformers/colorTokens";
import { makeSpacingTokens } from "../transformers/spacingTokens";
import { makeElevationTokens } from "../transformers/elevationTokens";

const fixPageName = name =>
  name
    .replace(/(🚧*)(✅*)/, "")
    .toLowerCase()
    .trim();

export const makeTokens = figmaPages => {
  const tokens = [];

  figmaPages.forEach(page => {
    const fixedPageName = fixPageName(page.name);

    if (fixedPageName === "color") {
      tokens.push({
        name: "colors",
        value: makeColorToken(page.children)
      });
    }

    if (fixedPageName === "spacing") {
      tokens.push({
        name: "spacings",
        value: makeSpacingTokens(page.children)
      });
    }

    if (fixedPageName === "elevation") {
      tokens.push({
        name: "elevation",
        value: makeElevationTokens(page.children)
      });
    }
  });

  return tokens;
};