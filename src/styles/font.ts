import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const allRoundGothic = localFont({
  src: [
    {
      path: "./fonts/allroundgothic-bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/allroundgothic-semi.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/allroundgothic-medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/allroundgothic-text.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/allroundgothic-thick.otf",
      weight: "100",
      style: "thin",
    },
  ],
  display: "swap",
  variable: "--font-allroundgothic",
});

export {  allRoundGothic,pretendard };