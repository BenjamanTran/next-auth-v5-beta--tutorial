import React from "react";
import { CardWrapper } from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Wellcome back"
      backButtonLabel="Dont have an account yet?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login form
    </CardWrapper>
  );
};

export default LoginForm;
