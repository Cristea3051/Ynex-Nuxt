import * as React from "react";

function IconCornerLeftUpDouble({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-left-up-double" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/corner-left-up-double"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 19h-6a3 3 0 0 1 -3 -3v-7" /><path d="M13 13l-4 -4l-4 4m8 -5l-4 -4l-4 4" /></svg>;
}

export default IconCornerLeftUpDouble;