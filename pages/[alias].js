import Error from "next/error";
import Head from "next/head";
import { getAliasFromDb } from "../lib/aliasHelpers";

function AliasRedirect({ destination, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Head>
        <title>Owly</title>
      </Head>

      <a href={destination}>Permanently moved here. Click to visit</a>
    </>
  );
}

export default AliasRedirect;

// This gets called on every request
export async function getServerSideProps({ params, res }) {
  let alias = params.alias.toLowerCase();

  // If alias contains - then parse it.
  if (alias.includes("-")) {
    alias = alias
      .split("-")
      .map((word) => word[0])
      .join("");
  }

  const aliasObject = await getAliasFromDb(alias);
  let errorCode = null;

  // if not found redirect to default 404 page
  if (!aliasObject) {
    errorCode = 404;
    res.statusCode = errorCode;

    return {
      props: { errorCode },
    };
  }

  const destination = aliasObject.destination.startsWith("http")
    ? aliasObject.destination
    : "http://" + aliasObject.destination;

  return {
    props: { destination },
    redirect: {
      permanent: true,
      destination: destination,
    },
  };
}
