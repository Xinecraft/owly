import { Db } from "mongodb";
import { withMongo } from "./mongodb";
import _ from "lodash";
const ALIAS_LENGTH = 7;

export async function getAliasFromDb(alias: string) {
  const aliasExists = await withMongo(async (db: Db) => {
    const aliasCollection = db.collection("shortLinks");
    const aliasExists = await aliasCollection.findOne({ alias });
    return aliasExists;
  });

  return aliasExists;
}

export async function generateUniqAlias() {
  let alias = null;
  do {
    alias = generateRandomAlias(ALIAS_LENGTH);
  } while (await getAliasFromDb(alias));

  return alias;
}

function generateRandomAlias(length: number) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
