import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TemplatePage() {
  return (
    <main className="py-10">
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
