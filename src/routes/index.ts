export const routes = {
  home: "/home",
  following: "/stalking",
  login: "",
  signup: "/signup",
  singlePiupiu: (id: string = ":id") => `/piu/${id}`,
  profile: (handle: string = ":handle") => `/${handle}`,
  userLikes: (handle: string = ":handle") => `/${handle}/likes`,
};

export const backendRoutes = {
  // v Retorna { token:string, user:User }
  login: "/login",
  // v Retorna User
  signup: "/signup",
  // v Retorna Piu[] aceita page e per_page como query params
  pius: "/pius",
  // v Retorna Piu
  singlePiupiu: {
    // v Retorna Piu
    post: (id: string = ":id") => `/posts/${id}`,
    // v Retorna Piu[]
    replies: (id: string = ":id") => `/posts/${id}/replies`,
    // v Retorna Piu
    like: (id: string = ":id") => `/posts/${id}/like`,
  },
  // v Retorna { user:User, posts:number }
  profile: (handle: string = ":handle") => `/users/${handle}`,
  user: {
    // v Retorna Piu[]
    posts: (handle: string = ":handle") => `/users/${handle}/posts`,
    // v Retorna Piu[]
    likes: (handle: string = ":handle") => `/users/${handle}/likes`,
  },
  latestUsers: "/users/latest",
};
