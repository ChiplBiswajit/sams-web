import React, { useEffect } from "react";
import Error from "../components/Error";
import Hamslogin from "../components/Hamslogin";
import { useRouter } from "next/router";

const HamsloginPage = () => {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    // console.log("query", query);
  }, [query]);

  return (
    <>
      <Hamslogin username={query.username} password={query.password} />
    </>
  );
};

export default HamsloginPage;
