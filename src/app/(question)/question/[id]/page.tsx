import Question from "./components/question";
import QuestionHeader from "./components/question-header";
import QuestionProgressbar from "./components/question-progressbar";

export default function QuestionPage() {
  // data fetching....
  return (
    <div className="w-full ">
      {/* Header */}
      <QuestionHeader />
      {/* Progressbar */}
      <QuestionProgressbar />
      {/* Question */}
      <Question title="" type="" />
    </div>
  );
}
