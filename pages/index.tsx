import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ClassAttributes, LegacyRef, useRef, useState } from "react";
import FormResult from "../components/FormResult";
import GeneratedLinksHistory from "../components/GeneratedLinksHistory";
import useStickyState from "../hooks/useStickyState";
import { FormResponse } from "../lib/interfaces";

const Home: NextPage = () => {
  let inputRef = useRef<HTMLInputElement>(null);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formResponse, setFormResponse] = useState<FormResponse | null>(null);

  const [linksHistory, setLinkHistory] = useStickyState(null, "links");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setFormError(null);
    setFormResponse(null);
    setIsLoading(true);
    event.preventDefault();

    if (!inputRef.current?.value) {
      setIsLoading(false);
      setFormError("Please enter a URL");
      return;
    }

    axios
      .post("/api/url", { url: inputRef.current.value })
      .then((data) => {
        setFormResponse(data.data);
        if (!linksHistory) {
          setLinkHistory([data.data]);
        } else {
          setLinkHistory(linksHistory.concat(data.data));
        }
        if (inputRef.current?.value) inputRef.current.value = "";
        setIsLoading(false);
      })
      .catch((error) => {
        setFormError(error.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Owly - Memorable Anonymous ShortLinks Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-9/12 m-auto mt-28">
        {/* <LinkToGithub /> */}

        <div className="flex flex-col">
          <div className="flex flex-col mb-10 items-center space-y-8">
            <h1 className="text-9xl text-gray-200">Owly</h1>
            <p className="text-sm">Memorable Anonymous ShortLinks Generator</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="form flex flex-col space-y-4"
          >
            <input
              ref={inputRef}
              placeholder="Enter a URL to shorten"
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {formError && (
              <span className="text-red-400 text-sm flex justify-center">
                {formError}
              </span>
            )}

            <div className="flex justify-center">
              <button
                disabled={isLoading}
                type="submit"
                className="text-white disabled:text-gray-300 w-1/3 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Shorten
              </button>
            </div>
          </form>
          {formResponse && <FormResult {...formResponse} />}

          {/* History Component */}
          {linksHistory && <GeneratedLinksHistory links={linksHistory} />}
        </div>
      </main>
    </>
  );
};

export default Home;
