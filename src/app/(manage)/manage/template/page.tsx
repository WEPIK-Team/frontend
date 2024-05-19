import Link from "next/link";

import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { TemplateSelectCard } from "@/components/card/template-select-card";
import { Templates } from "@/constants/dump";

export default function TemplatePage() {
  return (
    <main className="py-10">
      <Heading as="h1" className="font-allroundgothic text-wpt-2xl">
        템플릿
      </Heading>
      <div className="space-y-4">
        <div className="flex w-full items-end justify-end rounded-lg">
          <Button variant="default" asChild>
            <Link href="/manage/template/create">템플릿 생성</Link>
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
          {Templates.map((template) => (
            <>
              <div key={template.title} className="col-span-3">
                <div className="flex gap-1 pb-2">
                  <Button size={"sm"} variant={"secondary"}>
                    수정
                  </Button>
                  <Button size={"sm"} variant={"secondary"}>
                    삭제
                  </Button>
                </div>
                <TemplateSelectCard
                  image={template.image}
                  title={template.title}
                  tag={template.tag}
                  views={template.views}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
