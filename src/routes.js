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
    selectcategory: "/zamart/add-ads/Select-Category",
    myProfile: "/zamart/my-profile",
    userProfile: (userProfileId = ":userProfileId") =>
      `/zamart/user-profile/${userProfileId}`,
  },
};

export default routes;
