import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../utils/Recoil/authState";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useRecoilValue(authState);

  const checkAuth = async () => {
    const authToken = await sessionStorage.getItem("authToken");
    // Retrieve authentication token from local storage
    console.log("page reload", !isAuthenticated, !authToken);

    if (!isAuthenticated) {
      router.push("/login");
      // Redirect to login page if not authenticated and no token found
    }

    // if (!isAuthenticated && !authToken) {
    //   router.push("/login");
    //   // Redirect to login page if not authenticated and no token found
    // }
  };
  useEffect(() => {
    checkAuth();
  }, [router, isAuthenticated]);

  return isAuthenticated ? (
    // <ProtectedRoute>
    <>{children}</>
  ) : // </ProtectedRoute>
  null;
};

export default ProtectedRoute;
