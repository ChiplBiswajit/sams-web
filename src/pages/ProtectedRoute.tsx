import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../utils/Recoil/authState";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useRecoilValue(authState);

  const checkAuth = async () => {
    const authToken = await localStorage.getItem("authToken");
    console.log("Auth Token:", authToken);
    // console.log("Is Authenticated:", isAuthenticated);
    if (!isAuthenticated) {
      router.push("/login");
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, [router, isAuthenticated]);

  return isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute;
