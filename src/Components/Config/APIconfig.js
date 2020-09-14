const config = (data) => ({
  method: "post",
  url: "https://api-corona.azurewebsites.net/graphql",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
});

export default config;
