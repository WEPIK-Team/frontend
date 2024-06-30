import { useQuestionStore } from "@/provider/question-store-provider";

export default function useQuestion() {
  // values
  const currentQuestionIndex = useQuestionStore(
    (state) => state.currentQuestionIndex
  );
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = questions[currentQuestionIndex];
  const maxLength = questions.length - 1;

  // actions
  const prevQuestion = useQuestionStore((state) => state.prevQuestion);
  const nextQuestion = useQuestionStore((state) => state.nextQuestion);
  const moveIndexQuestion = useQuestionStore(
    (state) => state.moveIndexQuestion
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const changeQuestionValue = useQuestionStore(
    (state) => state.changeQuestionValue
  );
  const clearQuestion = useQuestionStore((state) => state.clearStore);

  const previousQuestionIndex = useQuestionStore(
    (state) => state.previousQuestionIndex
  );

  return {
    currentQuestionIndex,
    previousQuestionIndex,
    questions,
    currentQuestion,
    maxLength,
    moveIndexQuestion,
    prevQuestion,
    nextQuestion,
    updateQuestion,
    changeQuestionValue,
    clearQuestion,
  };
}
