import React from "react";
import { generateRandomSentenceFromAlias } from "../lib/genericHelpers";
import { FormResponse } from "../lib/interfaces";

function FormResult({ alias, destination, id }: FormResponse) {
  function selectAndCopy(event: React.FocusEvent<HTMLInputElement, Element>) {
    event.target.select();
  }

  const words1 = generateRandomSentenceFromAlias(alias);
  const words2 = generateRandomSentenceFromAlias(alias);
  const memorizableAlias1 = words1.join("-");
  const memorizableAlias2 = words2.join("-");

  return (
    <div className="flex flex-col space-y-2 text-center">
      <input
        readOnly={true}
        onFocus={selectAndCopy}
        value={window.location.origin + "/" + alias}
        type="text"
        className="mb-4 text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <div className="memorize space-y-2">
        <h2 className="text-3xl">Want to Memorize?</h2>
        <p>
          Take any word starting with the letters of <b>{alias}</b> and separate
          it with a dash and form a URL. It will work as well.
        </p>
        <p>
          Eg:{" "}
          <span className="capitalize text-lg font-bold">
            {words1.join(" ")}
          </span>
          &nbsp;will form URL as:
        </p>
        <input
          readOnly={true}
          onFocus={selectAndCopy}
          value={window.location.origin + "/" + memorizableAlias1}
          type="text"
          className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <p>Similarly below will work too:</p>
        <input
          readOnly={true}
          onFocus={selectAndCopy}
          value={window.location.origin + "/" + memorizableAlias2}
          type="text"
          className="text-center block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export default FormResult;
