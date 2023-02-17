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
  },
};

export default routes;
