import ProblemList from "./components/question-list";
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
      {/* Questions */}
      <ProblemList />
    </div>
  );
}
