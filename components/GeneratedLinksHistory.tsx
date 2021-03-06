import React from "react";
import { FormResponse } from "../lib/interfaces";

function GeneratedLinksHistory({
  links,
  clearHistory,
}: {
  links: FormResponse[];
  clearHistory: () => void;
}) {
  return (
    <div className="flex flex-col bg-gray-700 mt-10 mb-10 p-4 rounded shadow">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-2">Link History</h1>
        <button
          className="text-gray-300 hover:text-red-400 text-sm"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>
      <div className="flex flex-col bg-gray-900 rounded p-3 space-y-4 text-sm break-all">
        {links.map((link, index) => (
          <div
            key={link.id}
            className="itemHolder flex justify-between break-words space-x-4"
          >
            <div className="">
              <p>{link.destination}</p>
            </div>
            <div className="">
              <a
                href={window.location.origin + "/" + link.alias}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-orange-400 hover:text-pink-400 cursor-pointer"
              >
                {window.location.origin + "/" + link.alias}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedLinksHistory;
