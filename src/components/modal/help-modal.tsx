"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const HelpModal = () => {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOpen(false);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[358px] rounded-[30px] px-4 sm:rounded-[30px]">
        <DialogHeader>
          <DialogTitle className="text-center text-wpt-md font-normal text-wpc-gray">
            시작하기 전에
          </DialogTitle>
        </DialogHeader>
        <div>
          {step === 0 && (
            <div className="h-[340px]">
              <div className="flex flex-col items-center justify-center">
                <div className="mt-[30px] text-wpt-xl font-bold">
                  <p>
                    <span className="text-wpc-primary">WEPIK</span>이란?
                  </p>
                </div>
                <div>
                  <Image
                    src="images/help/help-1.svg"
                    alt="help-1"
                    width={326}
                    height={240}
                  />
                </div>
                <div className="text-wpt-base-2">
                  <p>
                    <span className="text-wpc-primary">WEPIK, 위픽</span>은
                    질문과 답변을 주고 받으며
                  </p>
                  <p>나와 상대를 알아갈 수 있는 문답 서비스예요.</p>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="h-[340px]">
              <div className="flex flex-col items-center justify-center">
                <div className="mt-[30px] text-center">
                  <p className="mb-[10px] text-wpt-lg font-bold">
                    질문 공유하기
                  </p>
                  <div className="text-center text-wpt-base-2 font-normal">
                    <p>답변을 작성한 후, 링크를 복사하여</p>
                    <p>답변이 궁금한 상대에게 공유해 주세요.</p>
                  </div>
                </div>
                <div className="mt-[18px]">
                  <Image
                    src="images/help/help-2.svg"
                    alt="help-2"
                    width={508}
                    height={242}
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="h-[340px]">
              <div className="flex flex-col items-center justify-center">
                <div className="mt-[30px] text-center">
                  <p className="mb-[10px] text-wpt-lg font-bold">
                    상대방의 답변이 궁금하다면?
                  </p>
                  <div className="text-center text-wpt-base-2 font-normal">
                    <p>상대방이 답변을 작성하고</p>
                    <p>공유할 때까지 기다려주세요.</p>
                  </div>
                </div>
                <div className="mt-[18px]">
                  <Image
                    src="images/help/help-3.svg"
                    alt="help-3"
                    width={318}
                    height={264}
                  />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="h-[340px]">
              <div className="flex flex-col items-center justify-center">
                <div className="mt-[30px] text-center">
                  <p className="mb-[10px] text-wpt-lg font-bold">
                    서로의 답변 확인하기
                  </p>
                  <div className="text-center text-wpt-base-2 font-normal">
                    <p>상대방에게 링크를 받아</p>
                    <p>서로의 답변을 확인해 보세요.</p>
                  </div>
                </div>
                <div className="mt-[18px]">
                  <Image
                    src="images/help/help-4.svg"
                    alt="help-4"
                    width={508}
                    height={262}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mt-[67px] flex justify-between">
            {step > 0 && (
              <Button
                onClick={handlePrevious}
                className="h-[60px] w-[159px] border-none bg-wpc-light-gray text-wpc-gray shadow-xl"
              >
                이전
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`h-[60px] ${step > 0 ? "w-[159px]" : "w-full"} border-none bg-wpc-second-grad shadow-xl`}
            >
              {step < 3 ? "다음" : "시작하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;