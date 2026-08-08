"use client";

export default function ThemeIntroScreen({
  selectedSubject,
  selectedTheme,
  getPrintText,
  onStartQuestion,
  onBackToThemes,
}) {
  return (
    <main>
      <div className="container">
        <div className="page-title">
          <h1>{selectedSubject.name} {selectedTheme.theme}</h1>
        </div>
        <div
          className="theme-comment"
          style={{ "--subject-color": selectedSubject.color }}
        >
          {getPrintText(selectedTheme.theme_comment)}
        </div>
        <button
          type="button"
          className="quiz-start-button"
          style={{ "--subject-color": selectedSubject.color }}
          onClick={onStartQuestion}
        >
          問題を解く
        </button>
        <button
          type="button"
          className="back-button"
          onClick={onBackToThemes}
        >
          ←前の画面に戻る
        </button>
      </div>
    </main>
  );
}
