import * as React from "react";

function IconGenderFemme({
  size = 24,
  color = "currentColor",
  stroke = 2,
  ...props
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-gender-femme" width={size} height={size} viewBox="0 0 24 24" strokeWidth={stroke} stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><desc>{"Download more icon variants from https://tabler-icons.io/i/gender-femme"}</desc><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={12} cy={9} r={5} /><path d="M12 14v7" /><path d="M7 18h10" /></svg>;
}

export default IconGenderFemme;