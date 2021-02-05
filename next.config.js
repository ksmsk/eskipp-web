module.exports = {
  async rewrites() {
    return [
      // {
      //   source: "/api/login",
      //   destination: "https://api.eksisozluk.com/Token",
      // },
      // {
      //   source: "/api/topics/:path*",
      //   destination: "https://api.eksisozluk.com/v2/index/:path*",
      // },
      {
        source: "/api/:path*",
        destination: "https://api.eksisozluk.com/v2/:path*",
      },
    ];
  },
};
