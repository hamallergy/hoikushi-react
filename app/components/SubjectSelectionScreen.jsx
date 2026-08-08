"use client";

function getTotalQuestionCount(subject) {
  let totalQuestionCount = 0;

  for (const theme of subject.theme_list) {
    totalQuestionCount += theme.questions.length;
  }

  return totalQuestionCount;
}

export default function SubjectSelectionScreen({ subjects, onSubjectSelect }) {
  return (
    <main>
      <div className="container">
        <div className="page-title">
          <h1>筆記試験（９科目）</h1>
        </div>
        <ul className="select-li">
          {subjects.map((subject, subjectIndex) => (
            <li key={subject.enname}>
              <button
                className="subject-button select-button"
                style={{ "--subject-color": subject.color }}
                type="button"
                onClick={() => onSubjectSelect(subjectIndex)}
              >
                <p>{subject.name}</p>
                <p>
                  {subject.theme_list.length}テーマ（全
                  {getTotalQuestionCount(subject)}問）
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
