import type React from "react";
import { twMerge } from "tailwind-merge";

import style from "./fa-icon.module.css";

const FaRegularCabinetFiling: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  const { className } = props;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={twMerge(style["fa-icon"], className)}
      viewBox="0 0 448 512"
    >
      {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M384 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM384 464H64c-8.837 0-16-7.163-16-16V280h352V448C400 456.8 392.8 464 384 464zM400 232h-352V64c0-8.837 7.163-16 16-16h320c8.837 0 16 7.163 16 16V232zM128 168h16c8.875 0 16-7.125 16-16V144h128v8c0 8.875 7.125 16 16 16H320c8.875 0 16-7.125 16-16V128c0-17.62-14.38-32-32-32h-160c-17.62 0-32 14.38-32 32v24C112 160.9 119.1 168 128 168zM128 408h16c8.875 0 16-7.125 16-16V384h128v8c0 8.875 7.125 16 16 16H320c8.875 0 16-7.125 16-16V368c0-17.62-14.38-32-32-32h-160c-17.62 0-32 14.38-32 32v24C112 400.9 119.1 408 128 408z" />
    </svg>
  );
};

export default FaRegularCabinetFiling;