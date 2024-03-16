import React from "react";
import Error from "../components/Error";
import Hamslogin from "../components/Hamslogin";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function hamslogin() {
  const router = useRouter();
  const { query } = router;
  
  useEffect(() => {
    console.log("query", query);
  }, [query]);

  return (
    <>
      {/* <Error/> */}
      <Hamslogin username={query.username} password={query.password} />
    </>
  );
}
