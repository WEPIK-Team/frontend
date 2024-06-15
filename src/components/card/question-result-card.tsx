"use client";

import RatingInput from "@/components/input/rating-input";
import QuestionLabel from "@/components/question/question-label";
import SelectItem from "@/components/question/select-item";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

import {
  QuestionAnswer,
  QuestionType,
  SelectQuestionDto,
} from "@/types/question";

type QuestionResultCardProps = {
  index: number;
  senderAnswer: QuestionAnswer;
  receiverAnswer: QuestionAnswer;
};

const QuestionContent: React.FunctionComponent<{
  type: QuestionType | "";
  sender: { answer: string; selectQuestionDtos?: SelectQuestionDto[] };
  receiver: { answer: string; selectQuestionDtos?: SelectQuestionDto[] };
}> = ({ type, sender, receiver }) => {
  switch (type) {
    case "INPUT":
      return (
        <>
          <div className="mb-[15px]">
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="sender">보낸사람</QuestionLabel>
            </div>
            <Input variant="default" readOnly value={sender.answer} />
          </div>
          <div>
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="receiver">받는사람</QuestionLabel>
            </div>
            <Input variant="default" readOnly value={receiver.answer} />
          </div>
        </>
      );
    case "SELECT":
      return (
        <>
          {sender?.selectQuestionDtos?.map((selectQuestionDto, index) => {
            let theme: "sender" | "receiver" | "default" | "both" = "default";
            let isSelect = false;

            if (
              Number(sender.answer) === index &&
              Number(receiver.answer) === index
            ) {
              theme = "both";
            } else if (Number(sender.answer) === index) {
              theme = "sender";
            } else if (Number(receiver.answer) === index) {
              theme = "receiver";
            }

            if (
              theme === "both" ||
              theme === "sender" ||
              theme === "receiver"
            ) {
              isSelect = true;
            }

            return (
              <div key={selectQuestionDto.title} className="mb-[10px]">
                <SelectItem
                  theme={theme}
                  value={selectQuestionDto.title}
                  isSelect={isSelect}
                />
              </div>
            );
          })}
        </>
      );
    case "STAR_RANK":
      return (
        <>
          <div className="mb-[25px]">
            <div className="mb-[7px] ml-[6px]">
              <QuestionLabel color="sender">보낸사람</QuestionLabel>
            </div>
            <RatingInput
              value={Number(sender.answer)}
              size={33}
              readOnly
              id={123}
              theme="sender"
            />
          </div>
          <div>
            <div className="mb-[7px] ml-[6px]">
              <QuestionLabel color="receiver">받는사람</QuestionLabel>
            </div>
            <RatingInput
              value={Number(receiver.answer)}
              size={33}
              readOnly
              id={123}
              theme="receiver"
            />
          </div>
        </>
      );
    case "TEXTAREA":
      return (
        <>
          <div className="mb-[15px]">
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="sender">보낸사람</QuestionLabel>
            </div>
            <Textarea defaultValue={sender.answer} variant="default" readOnly />
          </div>
          <div>
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="receiver">받는사람</QuestionLabel>
            </div>
            <Textarea
              defaultValue={receiver.answer}
              variant="default"
              readOnly
            />
          </div>
        </>
      );
    case "BAR":
      return (
        <>
          <div className="mb-[42px]">
            <div className="mb-[21px] ml-[6px]">
              <QuestionLabel color="sender">보낸사람</QuestionLabel>
            </div>
            <Slider value={[Number(sender.answer)]} theme="sender" />
          </div>
          <div>
            <div className="mb-[21px] ml-[6px]">
              <QuestionLabel color="receiver">받는사람</QuestionLabel>
            </div>
            <Slider value={[Number(receiver.answer)]} theme="receiver" />
          </div>
        </>
      );
    case "DATE":
      return (
        <>
          <div className="mb-[15px]">
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="sender">보낸사람</QuestionLabel>
            </div>
            <Input variant="default" readOnly value={sender.answer} />
          </div>
          <div>
            <div className="mb-[2px] ml-[6px]">
              <QuestionLabel color="receiver">받는사람</QuestionLabel>
            </div>
            <Input variant="default" readOnly value={receiver.answer} />
          </div>
        </>
      );
    default:
      return null;
  }
};

export function QuestionResultCard({
  index,
  senderAnswer,
  receiverAnswer,
}: QuestionResultCardProps) {
  return (
    <>
      <div className="w-full rounded-[18px] bg-gradient-to-t from-[#F8F7FD] from-[0%] to-[#FDFCFF] to-[100%] px-4 py-[30px]">
        <div className="mb-[25px]">
          <h2 className="text-wpt-2xl font-bold text-wpc-primary">{`Q${index}.`}</h2>
          <p className="pt-2 text-wpt-lg font-semibold">{senderAnswer.title}</p>
        </div>
        <QuestionContent
          type={senderAnswer.type as QuestionType}
          sender={senderAnswer}
          receiver={receiverAnswer}
        />
      </div>
    </>
  );
}
