"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";

interface SocialShareProps {
  kakaoId: number;
  type: string;
  result?: Record<string, string>;
}

const extractQuestionPath = (path: string) => {
  const pathSegments = path.split("/").filter(Boolean).slice(0, 2);
  return `/${pathSegments.join("/")}`;
};

const SocialShare = ({ kakaoId, type, result }: SocialShareProps) => {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && !result) {
      if (type === "sender") {
        setUrl(
          `${extractQuestionPath(window.location.pathname)}?senderId=${searchParams.get("senderId")}`
        );
      } else if (type === "receiver") {
        setUrl(
          `${extractQuestionPath(window.location.pathname)}/result/${searchParams.get("senderId")}/${searchParams.get("receiverId")}`
        );
      }
    }

    if (result) {
      setUrl(
        `${extractQuestionPath(window.location.pathname)}/result/${result.senderId}/${result.receiverId}`
      );
    }
  }, [type, searchParams, result]);

  const Icons = [
    {
      src: "/images/icons/url.png",
      alt: "urlIcon",
    },
    {
      src: "/images/icons/kakao.png",
      alt: "kakaoIcon",
    },
    {
      src: "/images/icons/x.png",
      alt: "xIcon",
    },
    {
      src: "/images/icons/facebook.png",
      alt: "facebookIcon",
    },
  ];

  const handleShare = (alt: string) => {
    let baseUrl = "";

    if (typeof window !== "undefined") {
      baseUrl = `${window.location.origin}`;
    }

    switch (alt) {
      case "facebookIcon":
        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${baseUrl}${url}`,
          "페이스북 공유하기",
          "width=600,height=800,location=no,status=no,scrollbars=yes"
        );
        break;
      case "xIcon":
        window.open(
          `https://twitter.com/intent/tweet?url=${baseUrl}${url}&text='서로에게 질문을 공유하고, 답변을 기다리며 더 친해져봐요.'`,
          "X 공유하기",
          "width=600,height=800,location=no,status=no,scrollbars=yes"
        );
        break;
      case "kakaoIcon":
        if (window.Kakao) {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
          }

          window.Kakao.Share.sendCustom({
            templateId: kakaoId,
            templateArgs: {
              url: url,
            },
          });
        }
        break;
      case "urlIcon":
        navigator.clipboard.writeText(`${baseUrl}${url}`).then(() => {
          toast({
            variant: "success",
            title: "링크가 복사되었어요.",
          });
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-3 pt-4">
      {Icons.map((icon) => (
        <Image
          key={icon.alt}
          src={icon.src}
          alt={icon.alt}
          width={52}
          height={52}
          className="cursor-pointer touch-pan-up duration-300 hover:-translate-y-1 hover:scale-105"
          onClick={() => handleShare(icon.alt)}
        />
      ))}
    </div>
  );
};

export default SocialShare;
