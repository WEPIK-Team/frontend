"use cllient";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "../question/prev-next-btns";
import SelectItem from "../question/select-item";

import { ISelectQuestion } from "@/types/question";

export interface SelectOption {
  label: string;
  value: string;
}

interface IQuestionSelectProps {
  type: "single" | "double" | "triple";
}

// form validation
const FormSchema = z.object({
  SELECT: z.string().min(1, { message: "옵션을 선택해 주세요" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const QuestionSelect: React.FunctionComponent<IQuestionSelectProps> = ({
  type,
}) => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, selectQuestions } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      SELECT: content,
    },
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
      <form className="w-full">
        <FormField
          control={form.control}
          name="SELECT"
          render={({ field }) => {
            return (
              <FormItem>
                <ul className="w-full space-y-2">
                  {selectQuestions.map((el: ISelectQuestion, i: number) => (
                    <SelectItem
                      key={el.id}
                      value={el.title}
                      isSelect={i === parseInt(field.value)}
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
        <PrevNextBtns<FormSchemaType> type="SELECT" form={form} />
      </form>
    </Form>
  );
};

export default QuestionSelect;
