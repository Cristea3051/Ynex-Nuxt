import * as React from "react";

function IconClubs({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clubs" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/clubs"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a4 4 0 0 1 3.164 6.447a4 4 0 1 1 -1.164 6.198v1.355l1 4h-6l1 -4l.001 -1.355a4 4 0 1 1 -1.164 -6.199a4 4 0 0 1 3.163 -6.446z" /></svg>;
}

export default IconClubs;