const dev = {
  REDIRECT_URL: process.env.REACT_APP_REDIRECT_URL,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  MEETING_BASE_URL: "https//localhost:4443",
};

const prod = {
  MEETING_BASE_URL: "https//localhost:4443",
};

const getEnv = () => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    default:
      return dev;
  }
};

export const env = getEnv();
