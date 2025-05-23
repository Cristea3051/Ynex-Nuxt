import * as React from "react";

function IconGenderHermaphrodite({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-gender-hermaphrodite" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/gender-hermaphrodite"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 14v7" /><path d="M9 18h6" /><circle transform="matrix(1 0 0 -1 0 20)" cx={12} cy={10} r={4} /><path d="M15 3a3 3 0 0 1 -6 0" /></svg>;
}

export default IconGenderHermaphrodite;