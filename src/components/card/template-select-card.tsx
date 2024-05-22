import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import Heading from "@/components/common/heading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { TemplateSelectCardProps } from "@/types/template-select";

export function TemplateSelectCard({
  image,
  title,
  tag,
  views,
}: TemplateSelectCardProps) {
  return (
    <>
      <Card>
        <CardContent className="w-full">
          <div className="relative">
            <div className="h-[174px] w-full">
              <Image
                src={image}
                className="rounded-xl object-cover"
                alt={title}
                layout="fill"
              />
            </div>
            <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-sm text-white">
              <PlayIcon />
              <span>{views}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <div className="relative">
              <Heading as="h3" className="m-0 p-0 text-[17px]">
                {title}
              </Heading>
            </div>
            <div className="flex space-x-2 text-[#8F8F95]">
              {tag.map((tag) => (
                <p className="m-0 p-0 text-[13px]" key={tag}>
                  #{tag}
                </p>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
