import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="h-full dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
