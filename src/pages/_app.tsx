import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { authState } from "../utils/Recoil/authState";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
  );
}
