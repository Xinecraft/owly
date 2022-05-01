import { Db } from "mongodb";
import { withMongo } from "./mongodb";
import _ from "lodash";
import wordListImport from "./words.json";
let wordList: any = wordListImport;
const ALIAS_LENGTH = 7;

export async function isAliasExists(alias: string) {
  const aliasExists = await withMongo(async (db: Db) => {
    const aliasCollection = db.collection("shortLinks");
    const aliasExists = await aliasCollection.findOne({ alias });
    return aliasExists;
  });

  return !!aliasExists;
}

export async function generateUniqAlias() {
  let alias = null;
  do {
    alias = generateRandomAlias(ALIAS_LENGTH);
  } while (await isAliasExists(alias));

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

export function generateRandomSentenceFromAlias(alias: string) {
  const format = [
    "noun",
    "adjective",
    "verb",
    "noun",
    "adjective",
    "verb",
    "noun",
  ];
  const sentence = [];
  const letters = alias.split("");

  for (let i = 0; i < letters.length; i++) {
    // If letter is number return number
    if (letters[i].match(/[0-9]/)) {
      sentence.push(letters[i]);
    } else {
      sentence.push(_.sample(wordList[format[i]][letters[i]]));
    }
  }

  return sentence.join(" ");
}
