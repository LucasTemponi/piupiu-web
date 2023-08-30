export const routes = {
  home: "/home",
  following: "/stalking",
  login: "",
  signup: "/signup",
  singlePiupiu: (id: string = ":id") => `/piu/${id}`,
  profile: (handle: string = ":handle") => `/${handle}`,
  userLikes: (handle: string = ":handle") => `/${handle}/likes`,
};
