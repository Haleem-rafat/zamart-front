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
    viewSubCategories: (categoriesId) =>
      `/categories/sub-categories/all?category=${categoriesId}`,
    ViewComplmentartCategories: (SubCategoriesId) =>
      `/categories/complementary-categories/all?subCategory=${SubCategoriesId}`,
    ViewCategoriesFromData: (categoriesId) =>
      `categories/${categoriesId}/form-data`,
    viewAllItems: "/items/user/all",
    createItemUser: "/items",
    getMyProfile: "/user/my-profile",
    getUserProfile: (UserProfileID) => `/user/seller-profile/${UserProfileID}`,
    viewAllOwner: "/items/user/owns-items",
  },
  cities: {
    default: "regions/cities",
  },
};

export default api;
