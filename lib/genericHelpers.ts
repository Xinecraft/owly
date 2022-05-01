import _ from "lodash";
import wordListImport from "./words.json";
let wordList: any = wordListImport;

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

  return sentence;
}
