import * as React from "react";

function IconArrowWaveRightDown({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-wave-right-down" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/arrow-wave-right-down"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 13.998h4v-4" /><path d="M3 11.998c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>;
}

export default IconArrowWaveRightDown;