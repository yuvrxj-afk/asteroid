import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  };
  return WithRouter;
};

export default withRouter;
