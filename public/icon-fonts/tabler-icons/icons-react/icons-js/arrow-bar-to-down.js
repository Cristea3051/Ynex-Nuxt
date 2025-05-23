import * as React from "react";

function IconArrowBarToDown({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-bar-to-down" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/arrow-bar-to-down"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={4} y1={20} x2={20} y2={20} /><line x1={12} y1={14} x2={12} y2={4} /><line x1={12} y1={14} x2={16} y2={10} /><line x1={12} y1={14} x2={8} y2={10} /></svg>;
}

export default IconArrowBarToDown;