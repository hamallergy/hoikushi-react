"use client";
import { useState } from "react";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import SubjectSelectionScreen from "./components/SubjectSelectionScreen";
import ThemeIntroScreen from "./components/ThemeIntroScreen";
import ThemeSelectionScreen from "./components/ThemeSelectionScreen";

function getPrintText(textdata) {
  if (textdata === null || textdata === undefined || textdata === "") {
    return "　";
  }
  const textarray = textdata.split("\n");
  return <div>{textarray.map((line, index) => (
    <p key={`textline-${index}`}>
      {line}
    </p>
  ))}</div>;
}

function createDisplayChoices(question) {
  const displayChoices = question.choices.map((choice, originalIndex) => ({
    text: choice,
    originalIndex,
  }));

  if (question.q_type === "正誤" || question.block_shuffle !== null) {
    return displayChoices;
  }

  for (let index = displayChoices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temporaryChoice = displayChoices[index];
    displayChoices[index] = displayChoices[randomIndex];
    displayChoices[randomIndex] = temporaryChoice;
  }

  return displayChoices;
}

export default function QuizApp({ subjects, initialUsersData }) {
  const [currentScreen, setCurrentScreen] = useState("subjects");
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [currentCorrectCount, setCurrentCorrectCount] = useState(0);
  const [displayChoices, setDisplayChoices] = useState([]);
  const [usersData, setUsersData] = useState(initialUsersData);

  function handleSubjectSelect(subjectIndex) {
    setSelectedSubjectIndex(subjectIndex);
    setCurrentScreen("themes");
  }

  function handleBackToSubjects() {
    setCurrentScreen("subjects");
    setSelectedSubjectIndex(null);
  }

  function handleThemeSelect(themeIndex) {
    setSelectedThemeIndex(themeIndex);
    setCurrentScreen("intro");
  }

  function handleStartQuestion() {
    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];
    const firstQuestion = selectedTheme.questions[0];

    setCurrentQuestionIndex(0);
    setSelectedChoiceIndex(null);
    setCurrentCorrectCount(0);
    setDisplayChoices(createDisplayChoices(firstQuestion));
    setCurrentScreen("question");
  }

  function handleChoiceSelect(choiceIndex) {
    if (selectedChoiceIndex !== null) {
      return;
    }

    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];
    const currentQuestion = selectedTheme.questions[currentQuestionIndex];
    const solvedValue =
      choiceIndex === currentQuestion.answer ? "correct" : "incorrect";

    if (solvedValue === "correct") {
      setCurrentCorrectCount((previousCount) => previousCount + 1);
    }

    setUsersData((currentUsersData) => ({
      ...currentUsersData,
      question: {
        ...currentUsersData.question,
        [currentQuestion.question_id]: {
          ...currentUsersData.question[currentQuestion.question_id],
          solved: solvedValue,
        },
      },
    }));

    setSelectedChoiceIndex(choiceIndex);
  }

  function handleNextQuestion() {
    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex === selectedTheme.questions.length) {
      setCurrentScreen("result");
      return;
    }

    setCurrentQuestionIndex(nextQuestionIndex);
    setSelectedChoiceIndex(null);
    setDisplayChoices(
      createDisplayChoices(selectedTheme.questions[nextQuestionIndex]),
    );
  }

  function handleBackToThemes() {
    setCurrentScreen("themes");
    setSelectedThemeIndex(null);
    setCurrentQuestionIndex(0);
    setSelectedChoiceIndex(null);
    setCurrentCorrectCount(0);
    setDisplayChoices([]);
  }

  if (currentScreen === "question") {
    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];
    const currentQuestion = selectedTheme.questions[currentQuestionIndex];

    return (
      <QuestionScreen
        selectedSubject={selectedSubject}
        selectedTheme={selectedTheme}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        displayChoices={displayChoices}
        selectedChoiceIndex={selectedChoiceIndex}
        getPrintText={getPrintText}
        onChoiceSelect={handleChoiceSelect}
        onNextQuestion={handleNextQuestion}
        onBackToThemes={handleBackToThemes}
      />
    );
  }

  if (currentScreen === "result") {
    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];

    return (
      <ResultScreen
        selectedSubject={selectedSubject}
        selectedTheme={selectedTheme}
        currentCorrectCount={currentCorrectCount}
        onBackToThemes={handleBackToThemes}
      />
    );
  }

  if (currentScreen === "intro") {
    const selectedSubject = subjects[selectedSubjectIndex];
    const selectedTheme = selectedSubject.theme_list[selectedThemeIndex];

    return (
      <ThemeIntroScreen
        selectedSubject={selectedSubject}
        selectedTheme={selectedTheme}
        getPrintText={getPrintText}
        onStartQuestion={handleStartQuestion}
        onBackToThemes={handleBackToThemes}
      />
    );
  }

  if (currentScreen === "themes") {
    const selectedSubject = subjects[selectedSubjectIndex];

    return (
      <ThemeSelectionScreen
        selectedSubject={selectedSubject}
        usersData={usersData}
        onThemeSelect={handleThemeSelect}
        onBackToSubjects={handleBackToSubjects}
      />
    );
  }
  if (currentScreen === "subjects") {
    return (
      <SubjectSelectionScreen
        subjects={subjects}
        onSubjectSelect={handleSubjectSelect}
      />
    );
  }
}
