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
    ceratitems: "/zamart/add-ads",
    selectcategory: "/zamart/add-ads/Select-Category",
    myProfile: "/zamart/my-profile",
    userProfile: (userProfileId = ":userProfileId") =>
      `/zamart/user-profile/${userProfileId}`,
  },
};

export default routes;
