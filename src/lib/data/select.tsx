import AllIcon from "@/components/icon/all-icon";
import BarIcon from "@/components/icon/bar-icon";
import DateIcon from "@/components/icon/date-icon";
import InputIcon from "@/components/icon/input-icon";
import SelectIcon from "@/components/icon/select-icon";
import StarRankIcon from "@/components/icon/star-rank-icon";
import TextAreaIcon from "@/components/icon/text-area-icon";

export enum QuestionTypeTest {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  STAR_RANK = "STAR_RANK",
  BAR = "BAR",
  SELECT = "SELECT",
  DATE = "DATE",
}

export const QuestionSelectOptions = [
  {
    label: "All",
    value: "All",
    icon: <AllIcon size={16} />,
  },
  {
    label: "Input",
    value: QuestionTypeTest.INPUT,
    icon: <InputIcon size={16} />,
  },
  {
    label: "Select",
    value: QuestionTypeTest.SELECT,
    icon: <SelectIcon size={16} />,
  },
  {
    label: "TextArea",
    value: QuestionTypeTest.TEXTAREA,
    icon: <TextAreaIcon size={16} />,
  },
  {
    label: "Bar",
    value: QuestionTypeTest.BAR,
    icon: <BarIcon size={16} />,
  },
  {
    label: "StarRank",
    value: QuestionTypeTest.STAR_RANK,
    icon: <StarRankIcon size={16} />,
  },

  {
    label: "Date",
    value: QuestionTypeTest.DATE,
    icon: <DateIcon size={16} />,
  },
];

export const QuestionSelectFormOptions = QuestionSelectOptions.filter(
  (_, i) => i !== 0
);
