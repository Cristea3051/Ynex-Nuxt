import * as React from "react";

function IconListDetails({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-details" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/list-details"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 5h8" /><path d="M13 9h5" /><path d="M13 15h8" /><path d="M13 19h5" /><rect x={3} y={4} width={6} height={6} rx={1} /><rect x={3} y={14} width={6} height={6} rx={1} /></svg>;
}

export default IconListDetails;