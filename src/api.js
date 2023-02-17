const api = {
  auth: {
    login: "/user/sign-in",
    registeration: "/user/sign-up",
    RefreshToken: "/user/refresh-token",
    fogetpass: "/user/forget-password",
    resspass: "/user/reset-password",
  },
  app: {
    viewCategories: "/categories/all",
    viewSubCategories: (SubCategoriesId) =>
      `/categories/sub-categories/all?category=${SubCategoriesId}`,
    viewAllItems: "/items/user/all",
  },
};

export default api;
