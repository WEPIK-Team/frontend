import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const START_WIDTH_SIZE = 62;

interface Props {
  rating: number;
  id: number;
  size: number;
  color: {
    from: string;
    to: string;
  };
  emptyColor: string;
}

function TempStarRate({ id, rating, size, color, emptyColor }: Props) {
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = useCallback(() => {
    const tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = rating * 20;
    let idx = 0;
    while (starVerScore > 0 && idx < STAR_IDX_ARR.length) {
      if (starVerScore >= 20) {
        tempStarRatesArr[idx] = START_WIDTH_SIZE;
      } else {
        tempStarRatesArr[idx] = (starVerScore / 20) * START_WIDTH_SIZE;
      }
      starVerScore -= 20;
      idx++;
    }
    return tempStarRatesArr;
  }, [rating, STAR_IDX_ARR.length]);

  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [calcStarRates]);

  return (
    <div className="flex w-[fit-content] items-center">
      {STAR_IDX_ARR.map((item, idx) => {
        const itemKey = id + item;
        return (
          <motion.span
            className={`inline-block ${idx !== STAR_IDX_ARR.length - 1 ? "mr-1" : ""}`}
            key={`${itemKey}_${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox={`0 0 ${START_WIDTH_SIZE} 60`}
              fill="none"
            >
              <defs>
                <filter
                  id={`${itemKey}filter0_d_252_1016`}
                  x="0.597717"
                  y="0.708008"
                  width="60.8046"
                  height="59.1035"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.482353 0 0 0 0 0.470588 0 0 0 0 0.92549 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_252_1016"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_252_1016"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id={`gradient_${itemKey}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={color?.from} />
                  <stop offset="100%" stopColor={color?.to} />
                </linearGradient>
              </defs>
              <path
                d="M28.1468 10.7811C29.0449 8.01722 32.9551 8.01722 33.8532 10.7812L36.6129 19.2746C37.0145 20.5106 38.1663 21.3475 39.466 21.3475H48.3965C51.3027 21.3475 52.511 25.0664 50.1599 26.7746L42.935 32.0238C41.8835 32.7877 41.4435 34.1418 41.8451 35.3779L44.6048 43.8713C45.5029 46.6353 42.3394 48.9336 39.9883 47.2254L32.7634 41.9762C31.7119 41.2123 30.2881 41.2123 29.2366 41.9762L22.0117 47.2254C19.6606 48.9336 16.4971 46.6353 17.3952 43.8713L20.1549 35.3779C20.5565 34.1418 20.1165 32.7877 19.065 32.0238L11.8401 26.7746C9.48897 25.0664 10.6973 21.3475 13.6035 21.3475H22.534C23.8337 21.3475 24.9855 20.5106 25.3871 19.2746L28.1468 10.7811Z"
                fill={emptyColor}
              />
              <clipPath id={`${itemKey}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="60" />
              </clipPath>
              <path
                d="M28.1468 10.7811C29.0449 8.01722 32.9551 8.01722 33.8532 10.7812L36.6129 19.2746C37.0145 20.5106 38.1663 21.3475 39.466 21.3475H48.3965C51.3027 21.3475 52.511 25.0664 50.1599 26.7746L42.935 32.0238C41.8835 32.7877 41.4435 34.1418 41.8451 35.3779L44.6048 43.8713C45.5029 46.6353 42.3394 48.9336 39.9883 47.2254L32.7634 41.9762C31.7119 41.2123 30.2881 41.2123 29.2366 41.9762L22.0117 47.2254C19.6606 48.9336 16.4971 46.6353 17.3952 43.8713L20.1549 35.3779C20.5565 34.1418 20.1165 32.7877 19.065 32.0238L11.8401 26.7746C9.48897 25.0664 10.6973 21.3475 13.6035 21.3475H22.534C23.8337 21.3475 24.9855 20.5106 25.3871 19.2746L28.1468 10.7811Z"
                fill={`url(#gradient_${itemKey})`}
                clipPath={`url(#${itemKey}StarClip)`}
                filter={`url(#${itemKey}filter0_d_252_1016)`}
              />
            </svg>
          </motion.span>
        );
      })}
    </div>
  );
}

export default TempStarRate;
