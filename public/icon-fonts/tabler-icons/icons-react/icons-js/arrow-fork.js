import * as React from "react";

function IconArrowFork({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-fork" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/arrow-fork"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 3h5v5" /><path d="M8 3h-5v5" /><path d="M21 3l-7.536 7.536a5 5 0 0 0 -1.464 3.534v6.93" /><path d="M3 3l7.536 7.536a5 5 0 0 1 1.464 3.534v.93" /></svg>;
}

export default IconArrowFork;