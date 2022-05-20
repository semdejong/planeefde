import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function NoSessionRoute({
  component: Component,
  ...restOfProps
}) {
  const isAuthenticated = !document.cookie.includes("isAuth");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...restOfProps} /> : <Redirect to="/" />
      }
    />
  );
}
