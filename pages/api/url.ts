import { Db } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateUniqAlias, getAliasFromDb } from "../../lib/aliasHelpers";
import { withMongo } from "../../lib/mongodb";

type ResponseData = {
  alias: string;
  destination: string;
  id: string;
};

type ResponseError = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  if (req.method != "POST") {
    return res.status(405).json({
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }

  // Get the form body
  let { url, alias, pod } = req.body;

  // HoneyPod trap
  if (pod) {
    return res.status(500).json({
      statusCode: 500,
      message: "I fked up!",
    });
  }

  if (!url) {
    return res.status(400).json({
      statusCode: 400,
      message: "URL is required",
    });
  }

  // Make sure URL is valid
  if (!isValidUrl(url)) {
    return res.status(400).json({
      statusCode: 400,
      message: "URL is Invalid",
    });
  }

  // Validation Checks for Alias
  if (alias) {
    if (alias.length < 7) {
      return res.status(400).json({
        statusCode: 400,
        message: "Alias must be atleast 7 characters long",
      });
    }

    const aliasExists = await getAliasFromDb(alias);

    if (aliasExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Provided alias already exists",
      });
    }
  } else {
    alias = await generateUniqAlias();
  }

  let created = await withMongo(async (db: Db) => {
    const collection = db.collection("shortLinks");
    const created = await collection.insertOne({
      destination: url,
      alias: alias.toLowerCase(),
      created: new Date().toISOString(),
    });

    return created;
  });

  if (created.insertedId) {
    return res.status(201).json({
      statusCode: 201,
      destination: url,
      alias: alias,
      id: created.insertedId.toString(),
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      statusCode: 500,
    });
  }
}

function isValidUrl(url: string) {
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return urlRegex.test(url);
}
