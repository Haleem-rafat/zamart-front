const routes = {
  auth: {
    resetpass: {
      default: "/auth/zamart",
      reset: "/auth/zamart/reset-password",
    },
  },
  app: {
    default: "/zamart",
    home: "/zamart/home",
    searchPage: "/zamart/home/search",
    ceratitems: {
      default: "/zamart/add-ads",
      selectCategory: `/zamart/add-ads/category`,
      selectSubCategory: (categoryId = ":categoryId") =>
        `/zamart/add-ads/${categoryId}/sub`,
      selectComplementCategory: (subCategoryId = ":subCategoryId") =>
        `/zamart/add-ads/${subCategoryId}/complement`,
      addDescription: "/zamart/add-ads/add-description",
      uploadImage: "/zamart/add-ads/upload-image",
    },
    viewItemById: (itemId = ":itemId") => `/zamart/${itemId}/ads-details`,
    selectcategory: "/zamart/add-ads/Select-Category",
    myProfile: "/zamart/my-profile",
    userProfile: (userProfileId = ":userProfileId") =>
      `/zamart/user-profile/${userProfileId}`,
    aboutUs: "/zamart/about-us",
    contactUs: "/zamart/contact-us",
  },
};

export default routes;
