import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "./prev-next-btns";
import SelectItem from "./select-item";

export interface SelectOption {
  label: string;
  value: string;
}

interface IQuestionSelectProps {
  type: "single" | "double" | "triple";
}

// form validation
const FormSchema = z.object({
  SELETE: z.string().min(1, { message: "옵션을 선택해 주세요" }),
});

const QuestionSelect: React.FunctionComponent<IQuestionSelectProps> = ({
  type,
}) => {
  // zustand
  const {
    maxLength,
    currentQuestion,
    currentQuestionIndex: index,
    prevQuestion,
    nextQuestion,
    updateQuestion,
  } = useQuestion();
  const { id, content, selects } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      SELETE: content,
    },
  });

  // function
  const onPrev = form.handleSubmit((data) => {
    updateQuestion(id, data.SELETE.toString());
    prevQuestion();
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);
    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(id, data.SELETE);
      nextQuestion();
    }
  });

  // const onNext = async (data: z.infer<typeof FormSchema>) => {

  // };

  // const [selectedValues, setSelectedValues] = useState<SelectOption[]>([]);

  // const handleSelect = (option: SelectOption) => {
  //   switch (type) {
  //     case "single":
  //       setSelectedValues([option]);

  //       break;
  //     case "double":
  //       if (selectedValues.includes(option)) {
  //         setSelectedValues(selectedValues.filter((val) => val !== option));
  //       } else if (selectedValues.length < 2) {
  //         setSelectedValues([...selectedValues, option]);
  //       }
  //       break;
  //     case "triple":
  //       if (selectedValues.includes(option)) {
  //         setSelectedValues(selectedValues.filter((val) => val !== option));
  //       } else if (selectedValues.length < 3) {
  //         setSelectedValues([...selectedValues, option]);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <Form {...form}>
      <form onSubmit={onNext} className="w-full">
        <FormField
          control={form.control}
          name="SELETE"
          render={({ field }) => {
            return (
              <FormItem>
                <ul className="w-full space-y-2">
                  {selects.map((el: any, i: number) => (
                    <SelectItem
                      key={el.value}
                      value={el.label}
                      isSelect={i === +field.value}
                      theme="default"
                      onClick={() => {
                        field.onChange(i + "");
                      }}
                    />
                  ))}
                </ul>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <PrevNextBtns onPrev={onPrev} onNext={onNext} />
      </form>
    </Form>
  );
};

export default QuestionSelect;
