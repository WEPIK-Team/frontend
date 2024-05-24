import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ButtonPage = () => {
  const error = true;

  return (
    <div className="mx-auto max-w-3xl space-y-3 py-5 ">
      {/* primary 색상 */}
      <Button variant="default" className="w-full">
        버튼1(default)
      </Button>

      {/* primary 색상(disabled)*/}
      <Button variant="default" className="w-full" disabled>
        버튼(default) disabled
      </Button>

      {/* gray 색상*/}
      <Button variant="gray" className="w-full">
        버튼(gray)
      </Button>

      {/* gray 색상(disabled)**/}
      <Button disabled variant="gray" className="w-full">
        버튼(gray) disabled
      </Button>

      <div className="pb-5">
        <Label>basic</Label>
        <Input placeholder="제목을 입력하세요" />
      </div>
      <div className="pb-5">
        <Label>grad</Label>
        <Input placeholder="제목을 입력하세요" variant="grad" />
      </div>
      <div className="pb-5">
        <Label>isError</Label>
        <Input placeholder="제목을 입력하세요" isError />
      </div>
      <div className="pb-5">
        <Label>grad && isError</Label>
        <Input placeholder="제목을 입력하세요" variant="grad" isError />
      </div>
      <div className="pb-5">
        <Label>grad && disabled</Label>
        <Input placeholder="제목을 입력하세요" variant="grad" disabled />
      </div>
      <div className="pb-5">
        <Label>isError && disabled</Label>
        <Input placeholder="제목을 입력하세요" isError disabled />
      </div>
    </div>
  );
};
export default ButtonPage;
