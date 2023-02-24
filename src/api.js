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
    viewItemById: (itemId) => `/items/${itemId}/details`,
    getMyProfile: "/user/my-profile",
    getUserProfile: (UserProfileID) => `/user/seller-profile/${UserProfileID}`,
    viewItemsAnalytics: "/items/user/owns-items/analytics",
    viewAllOwner: "/items/user/owns-items",
    sendEnquiry: (id) => `/items/user/${id}/send-enquiry`,
    sendCallRequest: (id) => `items/user/${id}/make-call`,
  },
  cities: {
    default: "/regions/cities",
  },
  brand: {
    default: (categoriesId) => `/brands?categoryId=${categoriesId}`,
  },
  model: {
    default: (brandId) => `/brands/${brandId}/models`,
  },
};

export default api;
