"use client";

function getCorrectQuestionCount(theme, usersData) {
  const correctQuestions = theme.questions.filter((question) => {
    const userQuestionData = usersData.question[question.question_id];
    return userQuestionData.solved === "correct";
  });

  return correctQuestions.length;
}

function getProgressPercent(correctQuestionCount, totalQuestionCount) {
  if (totalQuestionCount === 0) {
    return 0;
  }

  return Math.round((correctQuestionCount / totalQuestionCount) * 100);
}

export default function ThemeSelectionScreen({
  selectedSubject,
  usersData,
  onThemeSelect,
  onBackToSubjects,
}) {
  let themeContent;

  if (selectedSubject.theme_list.length === 0) {
    themeContent = <p>まだコンテンツがありません</p>;
  } else {
    themeContent = (
      <ul className="select-li">
        {selectedSubject.theme_list.map((theme, themeIndex) => {
          const totalQuestionCount = theme.questions.length;
          const correctQuestionCount = getCorrectQuestionCount(
            theme,
            usersData,
          );
          const progressPercent = getProgressPercent(
            correctQuestionCount,
            totalQuestionCount,
          );

          return (
            <li key={theme.theme}>
              <button
                className="select-button"
                style={{ "--subject-color": selectedSubject.color }}
                onClick={() => onThemeSelect(themeIndex)}
              >
                <p>{theme.theme}</p>
                <p>全{totalQuestionCount}問</p>
                <p>
                  {correctQuestionCount}問正解
                </p>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      "--progress-width": `${progressPercent}%`,
                      "--subject-color": selectedSubject.color,
                    }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <main>
      <div className="container">
        <div className="page-title">
          <h1>{selectedSubject.name}</h1>
        </div>
        {themeContent}
        <button
          type="button"
          className="back-button"
          onClick={onBackToSubjects}
        >
          ←前の画面に戻る
        </button>
      </div>
    </main>
  );
}
