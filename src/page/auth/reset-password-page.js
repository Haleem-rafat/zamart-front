import React from "react";
import AuthSidebar from "../../components/shared/sidebar/sidebar";

const ResetPasswordPage = () => {
  return (
    <div className="text-white">
      <AuthSidebar isreset={true} />
    </div>
  );
};

export default ResetPasswordPage;
