import { Db } from "mongodb";
import validUrl from "valid-url";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateRandomSentenceFromAlias,
  generateUniqAlias,
  isAliasExists,
} from "../../lib/aliasHelpers";
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
  let { url, alias } = req.body;

  if (!url) {
    return res.status(400).json({
      statusCode: 400,
      message: "URL is required",
    });
  }

  // Make sure URL is valid
  if (!validUrl.isUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      message: "URL is invalid",
    });
  }

  // Check if alias is provided and if yes then make sure it don't already exists in database
  if (alias) {
    const aliasExists = await isAliasExists(alias);
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
      alias: alias,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
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
