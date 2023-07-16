import * as React from "react"



const h1Styles = {
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "3rem",
  fontStyle: "normal",
  fontWeight: "500",
}

const GoodStyle = {
  "color": "#FDC959",
  "fontWeight": "500",

}
const EStyle = {
  "color": "#FD5E09",
}
const WorkersStyle = {
  "color": "#B3A0CF",
}

const allCenteredDiv = {
  height: "100vh",
  display: "flex",
  alighItems: "center",
  justifyContent: "center",
  textAlign: "center",
}

const bigYelloCTA = {
  backgroundColor: "#FDC959",
  color: "black",
  fontFamily: "ClashDisplay-Bold",
  padding: "30px",
  fontSize: "2rem",
  textDecoration:"none",
  borderRadius: "243px",
}
const CTAContainer = {
  margin:"10vh",
}

const IndexPage = () => {
  return (
    <main style={allCenteredDiv}>
      <div >
        <h1 style={h1Styles}>
          Welcome to <span className={"clash-medium"} style={GoodStyle}>Good</span>
            <span className={"clash-medium"} style={EStyle}>e</span>
            <span className={"clash-medium"} style={WorkersStyle}>Workers</span>
        </h1>
        <p>
          We are still working on this page...
        </p>
        <br/>
        <p style={CTAContainer}>
          <a style={bigYelloCTA} href="mailto:goodeworkers@proton.me">e-mail</a>
        </p>
      </div>
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <>
   <meta 
    name="viewport" 
    content="width=device-width, initial-scale=1" />
  <title>GoodEWorkers</title>
  </>
  )
