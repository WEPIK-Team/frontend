"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import Heading from "@/components/common/heading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { TemplateAction } from "./template-action";

import { TemplateSelectCardProps } from "@/types/template";

export function TemplateSelectCard({
  id,
  imageURL,
  title,
  templateTags,
  useCount,
  isAdmin = false,
  selectedTags,
}: TemplateSelectCardProps) {
  const router = useRouter();
  return (
    <>
      <Card
        className="cursor-pointer"
        onClick={() => router.push(`/question/${id}`)}
      >
        <CardContent className="relative w-full">
          <div>
            <div className="relative h-[174px] w-full">
              <Image
                src={imageURL}
                className="h-auto w-auto rounded-xl"
                alt={title}
                fill
                sizes="50vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 flex h-9 rounded-b-lg bg-gradient-to-t from-[rgba(0,0,0,0.3)]">
              <div className="ml-3 flex items-center gap-[6px] text-sm text-white">
                <Image
                  width={12}
                  height={12}
                  src="/svgs/play.svg"
                  alt="playIcon"
                />
                <span>{useCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-2 flex justify-between">
          <div className="flex flex-col">
            <Heading as="h3" className="m-0 p-0 text-wpt-md">
              {title}
            </Heading>
            <div className="mt-[3px] flex gap-[5px]">
              {templateTags.map((tag) => (
                <p
                  className={cn(
                    "text-wpt-sm",
                    selectedTags?.includes(tag)
                      ? "font-medium text-wpc-primary"
                      : "text-wpc-gray"
                  )}
                  key={tag}
                >
                  #{tag}
                </p>
              ))}
            </div>
          </div>
          {isAdmin ? <TemplateAction /> : null}
        </CardFooter>
      </Card>
    </>
  );
}
