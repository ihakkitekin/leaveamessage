import React from 'react';
import { Route } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { NotAuthorized } from "../../pages/NotAuthorized/NotAuthorized";

export function AuthRoute({ children, ...rest }) {
  const user = React.useContext(UserContext);

  const checkUser = React.useCallback(() => {
    if (user) {
      return children;
    } else {
      return <NotAuthorized />
    }
  }, [user, children]);
  return <Route {...rest} render={checkUser} />
}