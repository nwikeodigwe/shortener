import Bowser from "bowser";

const getBrowserClient = async () => {
  const browser = Bowser.parse(window.navigator.userAgent);
  return browser;
};

export default getBrowserClient;
