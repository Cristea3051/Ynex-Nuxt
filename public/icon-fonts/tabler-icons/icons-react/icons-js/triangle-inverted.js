import * as React from "react";

function IconTriangleInverted({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-triangle-inverted" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/triangle-inverted"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h14a2 2 0 0 1 1.84 2.75l-7.1 12.25a2 2 0 0 1 -3.5 0l-7.1 -12.25a2 2 0 0 1 1.75 -2.75" /></svg>;
}

export default IconTriangleInverted;