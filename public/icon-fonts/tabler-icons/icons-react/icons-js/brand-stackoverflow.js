import * as React from "react";

function IconBrandStackoverflow({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-stackoverflow" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/brand-stackoverflow"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1" /><path d="M8 16h8" /><path d="M8.322 12.582l7.956 .836" /><path d="M8.787 9.168l7.826 1.664" /><path d="M10.096 5.764l7.608 2.472" /></svg>;
}

export default IconBrandStackoverflow;