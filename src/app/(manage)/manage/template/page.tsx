import Link from "next/link";

import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";

export default function TemplatePage() {
  return (
    <main className="py-10">
      <Heading as="h1" className="font-allroundgothic text-wpt-2xl">
        템플릿
      </Heading>
      <div className="space-y-4">
        <div className="flex w-full items-end justify-end rounded-lg">
          <Button variant="secondary" asChild>
            <Link href="/manage/template/create">Create</Link>
          </Button>
        </div>
        <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-400">
          Template List
        </div>
      </div>
    </main>
  );
}
