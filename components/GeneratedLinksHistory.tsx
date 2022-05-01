import React from "react";
import { generateRandomSentenceFromAlias } from "../lib/genericHelpers";
import { FormResponse } from "../lib/interfaces";

function GeneratedLinksHistory({ links }: { links: FormResponse[] }) {
  return <div>
	{links.map((link, index) => 
		<div key={index}>
			<p>{link.alias}</p>
			<p>Rem: {generateRandomSentenceFromAlias(link.alias).join(" ")}</p>
		</div>
	)}
  </div>
}

export default GeneratedLinksHistory;
