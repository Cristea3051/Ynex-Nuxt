import * as React from "react";

function IconCaretDown({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/caret-down"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" /></svg>;
}

export default IconCaretDown;