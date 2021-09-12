import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Componnet, ...rest }) => {
  const token = localStorage.getItem("access_token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token !== null) return <Componnet {...props} />;
        else
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: props.location,
              }}
            />
          );
      }}
    />
  );
};

export default ProtectedRoute;
