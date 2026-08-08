import { readFileSync } from "node:fs";
import { join } from "node:path";

const SUBJECTS_DECLARATION = "const subjects=";
const USERS_DATA_DECLARATION = "let users_data=";

function removeTrailingSemicolon(valueText, dataName) {
  const trimmedText = valueText.trim();

  if (!trimmedText.endsWith(";")) {
    throw new Error(`${dataName} の末尾にセミコロンがありません。`);
  }

  return trimmedText.slice(0, -1).trim();
}

export function loadQuestionData() {
  const dataFilePath = join(
    process.cwd(),
    "assets",
    "question_data.js",
  );
  const sourceText = readFileSync(dataFilePath, "utf8");

  const subjectsDeclarationIndex = sourceText.indexOf(SUBJECTS_DECLARATION);
  const usersDataDeclarationIndex = sourceText.indexOf(USERS_DATA_DECLARATION);

  if (subjectsDeclarationIndex === -1) {
    throw new Error("subjects の宣言が見つかりません。");
  }

  if (usersDataDeclarationIndex === -1) {
    throw new Error("users_data の宣言が見つかりません。");
  }

  if (usersDataDeclarationIndex < subjectsDeclarationIndex) {
    throw new Error("問題データの宣言順が想定と異なります。");
  }

  const subjectsValueStart =
    subjectsDeclarationIndex + SUBJECTS_DECLARATION.length;
  const usersDataValueStart =
    usersDataDeclarationIndex + USERS_DATA_DECLARATION.length;

  const subjectsText = removeTrailingSemicolon(
    sourceText.slice(subjectsValueStart, usersDataDeclarationIndex),
    "subjects",
  );
  const usersDataText = removeTrailingSemicolon(
    sourceText.slice(usersDataValueStart),
    "users_data",
  );

  const subjects = JSON.parse(subjectsText);
  const usersData = JSON.parse(usersDataText);

  return {
    subjects,
    usersData,
  };
}
