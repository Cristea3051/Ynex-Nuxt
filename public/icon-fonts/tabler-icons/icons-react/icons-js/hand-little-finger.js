import * as React from "react";

function IconHandLittleFinger({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-hand-little-finger" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/hand-little-finger"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 13v-2.5a1.5 1.5 0 0 1 3 0v1.5" /><path d="M11 11.5v-1a1.5 1.5 0 0 1 3 0v1.5" /><path d="M17 12v-5.5a1.5 1.5 0 0 1 3 0v9.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /></svg>;
}

export default IconHandLittleFinger;