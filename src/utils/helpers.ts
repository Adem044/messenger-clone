export const shortenText = (text: string | JSX.Element) => {
  if (typeof text === "string" && text.length > 19) {
    return `${text.substring(0, 16)}...`;
  }
  return text;
};
