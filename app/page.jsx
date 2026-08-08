import QuizApp from "@/app/QuizApp";
import { loadQuestionData } from "@/lib/loadQuestionData";

export default function Home() {
  const { subjects, usersData } = loadQuestionData();

  return <div>
    <header>
      <h1>保育士試験一問一答</h1>
    </header>
    <QuizApp subjects={subjects} initialUsersData={usersData} />
  </div>;
}
