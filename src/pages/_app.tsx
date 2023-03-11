import DefaultLayout from "@/layouts/default";
import { NextPageWithLayout } from "@/lib/types";
import "@/styles/tailwind.css";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getDefaultLayout = (
  page: ReactElement,
  headingText: string
): ReactNode => {
  return <DefaultLayout headerText={headingText}>{page}</DefaultLayout>;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return getLayout(
    <Component {...pageProps} />,
    Component.pageHeadingText ?? ""
  );
}
