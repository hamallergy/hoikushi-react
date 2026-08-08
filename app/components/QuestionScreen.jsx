"use client";

export default function QuestionScreen({
  selectedSubject,
  selectedTheme,
  currentQuestion,
  currentQuestionIndex,
  displayChoices,
  selectedChoiceIndex,
  getPrintText,
  onChoiceSelect,
  onNextQuestion,
  onBackToThemes,
}) {
  return (
    <main>
      <div className="page-title">
        <h1>{selectedSubject.name} {selectedTheme.theme}</h1>
      </div>
      <div className="container">
        <p className="pre-question">問{currentQuestionIndex + 1}
          {currentQuestion.pre_question !== "" && (
            <span> {currentQuestion.pre_question}</span>
          )}
        </p>
        <div className="question">{getPrintText(currentQuestion.question)}</div>
        <div className="choice-list">
          {displayChoices.map((displayChoice) => {
            const choiceIndex = displayChoice.originalIndex;
            const isAnswered = selectedChoiceIndex !== null;
            const isCorrectChoice = choiceIndex === currentQuestion.answer;
            const isSelectedWrongChoice =
              isAnswered &&
              selectedChoiceIndex !== currentQuestion.answer &&
              choiceIndex === selectedChoiceIndex;
            let choiceClassName = "choice-button";

            if (isAnswered){
              if (isCorrectChoice) {
                choiceClassName += " choice-disabled choice-correct";
              } else if (isSelectedWrongChoice) {
                choiceClassName += " choice-disabled choice-incorrect";
              } else{
                choiceClassName += " choice-disabled";
              }
            }

            return (
              <button
                key={`choice-${choiceIndex}`}
                type="button"
                className={choiceClassName}
                onClick={() => onChoiceSelect(choiceIndex)}
                disabled={selectedChoiceIndex !== null}
              >
                {displayChoice.text}
                {isAnswered && isCorrectChoice && "（正解）"}
                {isSelectedWrongChoice && "（選んだ誤答）"}
              </button>
            );
          })}
        </div>
        {selectedChoiceIndex !== null && (
          <>
            <p>
              {selectedChoiceIndex === currentQuestion.answer
                ? "正解！"
                : "不正解"}
            </p>
            <div className="container explanation">
              <h2>解説</h2>
              {currentQuestion.comment_1 === null
                ? <p>まだ解説はありません。</p>
                : getPrintText(currentQuestion.comment_1)}
            </div>
          </>
        )}
        {selectedChoiceIndex !== null && (
          <button
            type="button"
            className="next-button"
            style={{ "--subject-color": selectedSubject.color }}
            onClick={onNextQuestion}
          >
            次の問題へ
          </button>
        )}
        <button
          type="button"
          className="back-button"
          onClick={onBackToThemes}
        >
          前の画面に戻る
        </button>
      </div>
    </main>
  );
}
