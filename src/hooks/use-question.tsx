import { useQuestionStore } from "@/provider/question-store-provider";

export default function useQuestion() {
  const currentQuestionIndex = useQuestionStore(
    (state) => state.currentQuestionIndex
  );
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = questions[currentQuestionIndex];
  const maxLength = questions.length - 1;

  const prevQuestion = useQuestionStore((state) => state.prevQuestion);
  const nextQuestion = useQuestionStore((state) => state.nextQuestion);
  const moveIndexQuestion = useQuestionStore(
    (state) => state.moveIndexQuestion
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  return {
    currentQuestionIndex,
    questions,
    maxLength,
    currentQuestion,
    prevQuestion,
    nextQuestion,
    moveIndexQuestion,
    updateQuestion,
  };
}
