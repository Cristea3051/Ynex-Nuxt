import * as React from "react";

function IconArrowsDiagonalMinimize({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-diagonal-minimize" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/arrows-diagonal-minimize"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10h4v-4" /><path d="M4 4l6 6" /><path d="M18 14h-4v4" /><path d="M14 14l6 6" /></svg>;
}

export default IconArrowsDiagonalMinimize;