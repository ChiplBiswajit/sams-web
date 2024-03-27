import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loader from "@/src/components/Loader";
import { Amteklogo } from "@/src/assets/SuperAdmin/header";
import { RecoilRoot, useRecoilValue } from "recoil"; // Import Recoil components
import { authState } from '../../utils/Recoil/authState'; // Import your Recoil atom for auth state

type prop = {
  title?: string;
  children: ReactElement | ReactElement[];
};

export default function SAmainLayout({ children, title = "AMTeK" }: prop) {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useRecoilValue(authState); // Access auth state from Recoil

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Your asynchronous logic here

      // Once the data is loaded, set loading to false
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
   
      <>
        <Head>
          <meta property="og:image" content={Amteklogo.src} />
          <title>{title}</title>
          <link rel="icon" href="amtekk.webp"></link>
        </Head>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Sidebar>
              <>{children}</>
            </Sidebar>
          </>
        )}
      </>
    
  );
}
