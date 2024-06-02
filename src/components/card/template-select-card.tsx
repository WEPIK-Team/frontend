"use client";

import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Heading from "@/components/common/heading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { TemplateAction } from "./template-action";

import { Template } from "@/types/template";

export function TemplateSelectCard({
  id,
  imageURL,
  title,
  templateTags,
  useCount,
  isAdmin = false,
}: Template) {
  const router = useRouter();
  return (
    <>
      <Card
        className="cursor-pointer"
        onClick={() => router.push(`/question/${id}`)}
      >
        <CardContent className="w-full">
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
            <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-sm text-white">
              <PlayIcon />
              <span>{useCount}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <div className="relative">
              <Heading as="h3" className="m-0 p-0 text-[17px]">
                {title}
              </Heading>
            </div>
            <div className="flex space-x-2 text-[#8F8F95]">
              {templateTags.map((tag) => (
                <p className="m-0 p-0 text-[13px]" key={tag}>
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
