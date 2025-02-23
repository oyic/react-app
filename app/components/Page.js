import React, { useEffect } from "react"
import Wrapper from "./Wrapper"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | ComplexApp`
    window.scrollTo(0,0)
  })
  return (
    <Wrapper wide={props.wide}>
      {props.children}
    </Wrapper>
  )
}

export default Page