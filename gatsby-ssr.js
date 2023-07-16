import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Inter-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="interFont"
    />,
     <link
      rel="preload"
      href="/fonts/ClashDisplay-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="clashDisplayRegularFont"
    />,
    <link
      rel="preload"
      href="/fonts/ClashDisplay-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="clashDisplayMediumFont"
    />,
     <link
      rel="preload"
      href="/fonts/ClashDisplay-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="clashDisplayBoldFont"
    />,
  ])
}