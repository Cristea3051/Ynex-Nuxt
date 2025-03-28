import * as React from "react";

function IconChevronUpLeft({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up-left" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/chevron-up-left"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 16v-8h8" /></svg>;
}

export default IconChevronUpLeft;