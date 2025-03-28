import * as React from "react";

function IconTornado({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tornado" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/tornado"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={21} y1={4} x2={3} y2={4} /><line x1={13} y1={16} x2={7} y2={16} /><line x1={11} y1={20} x2={15} y2={20} /><line x1={6} y1={8} x2={20} y2={8} /><line x1={4} y1={12} x2={16} y2={12} /></svg>;
}

export default IconTornado;