import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import FormResult from "../components/FormResult";
import GeneratedLinksHistory from "../components/GeneratedLinksHistory";
import LinkToGithub from "../components/LinkToGithub";
import useStickyState from "../hooks/useStickyState";
import { FormResponse } from "../lib/interfaces";

const Home: NextPage = () => {
  let inputRef = useRef<HTMLInputElement>(null);
  let podInputRef = useRef<HTMLInputElement>(null);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formResponse, setFormResponse] = useState<FormResponse | null>(null);

  const [linksHistory, setLinkHistory] = useStickyState(null, "links");

  function clearHistory() {
    setLinkHistory(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setFormError(null);
    setFormResponse(null);
    setIsLoading(true);
    event.preventDefault();

    if (!inputRef.current?.value) {
      setIsLoading(false);
      setFormError("Please enter a URL to shorten.");
      return;
    }

    axios
      .post("/api/url", {
        url: inputRef.current.value,
        pod: podInputRef.current?.value,
      })
      .then((data) => {
        setFormResponse(data.data);
        if (!linksHistory) {
          setLinkHistory([data.data]);
        } else {
          setLinkHistory([data.data, ...linksHistory]);
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
        <meta
          name="title"
          content="Owly - Memorable Anonymous ShortLinks Generator"
        />
        <meta
          name="description"
          content="Free Anonymous URL Shortner with memorable keywords. ✓ Check it out!"
        />
        <meta name="keywords" content="owly,url,shortner,shortlink,generator" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Xinecraft" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-8/12 m-auto mt-28 dark">
        <LinkToGithub />

        <div className="flex flex-col">
          <div className="flex flex-col mb-5 items-center space-y-4">
            <h1 className="text-9xl py-5 font-bold text-gray-200 text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
              Owly<small className="text-2xl">.lol</small>
            </h1>
            <p className="text-sm">Memorable Anonymous ShortLinks Generator</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="form flex flex-col space-y-4"
          >
            <input
              type="text"
              style={{ display: "none" }}
              name="url"
              ref={podInputRef}
            />
            <input
              ref={inputRef}
              placeholder="Enter a URL to shorten"
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:orange-blue-500 dark:bg-gray-900 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                className="inline-flex justify-center text-white disabled:text-gray-300 w-1/3 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Shorten
              </button>
            </div>
          </form>
          {formResponse && <FormResult {...formResponse} />}

          {linksHistory && (
            <GeneratedLinksHistory
              links={linksHistory}
              clearHistory={clearHistory}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
