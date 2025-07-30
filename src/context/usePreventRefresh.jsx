import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventRefresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      alert(
        "Are you sure you want to leave? Any unsaved changes will be lost."
      );
      localStorage.removeItem("token");
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Any unsaved changes will be lost.";
    };

    const handleRouteChange = () => {
      navigate("/");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [navigate]);
};

export default usePreventRefresh;
