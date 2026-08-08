"use client";

export default function ResultScreen({
  selectedSubject,
  selectedTheme,
  currentCorrectCount,
  onBackToThemes,
}) {
  const totalQuestionCount = selectedTheme.questions.length;
  const incorrectQuestionCount = totalQuestionCount - currentCorrectCount;

  return (
    <main>
      <div className="container">
        <div className="page-title">
          <h1>{selectedSubject.name} {selectedTheme.theme}</h1>
        </div>
        <div className="container">
          <h2>全問終了！</h2>
          <p>正解数：{currentCorrectCount}</p>
          <p>不正解数：{incorrectQuestionCount}</p>
          <button
            type="button"
            className="back-button"
            onClick={onBackToThemes}
          >
            前の画面に戻る
          </button>
        </div>
        </div>
    </main>
  );
}
