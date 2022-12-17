import type React from "react";
import { twMerge } from "tailwind-merge";

import style from "./fa-icon.module.css";

const FaSolidAxe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className } = props;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={twMerge(style["fa-icon"], className)}
      viewBox="0 0 640 512"
    >
      {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M374.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3L384 301.3V384c0 17.7 14.3 32 32 32c123.7 0 224-100.3 224-224c0-17.7-14.3-32-32-32H525.3l-56-56 33.4-33.4c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0L408 42.7 374.6 9.4zM448 316c45-11.6 80.4-47 92-92h32.8C560.1 286.7 510.7 336.1 448 348.8V316zM244.1 206.6L9.4 441.4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0L305.4 267.9l-61.3-61.3z" />
    </svg>
  );
};

export default FaSolidAxe;