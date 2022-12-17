import { twMerge } from "tailwind-merge";

import style from "./fa-icon.module.css";

const FaRegularSeedling: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className } = props;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={twMerge(style["fa-icon"], className)}
      viewBox="0 0 512 512"
    >
      {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path d="M436.4 32c-91 0-168.3 67.88-194.6 161.4C204.6 134.6 144 96 75.63 96L0 95.1V120C0 247.9 91.75 352 204.4 352H232v104C232 469.2 242.8 480 255.1 480S280 469.2 280 456V288h27.62C420.2 288 512 183.9 512 56V32H436.4zM204.4 304c-79.25 0-145.1-69.75-155.1-160h26.25c79.25 0 145.1 69.75 155.1 160H204.4zM307.6 240h-26.25c10-90.25 75.87-160 155.1-160h26.25C452.8 170.2 386.9 240 307.6 240z" />
    </svg>
  );
};

export default FaRegularSeedling;