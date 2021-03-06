import { faShoePrints } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Transition } from "framer-motion";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Link from "next/link";

const animate = { y: 20 };
const transition: Transition = {
  repeat: Infinity,
  duration: 2,
  repeatType: "reverse",
};

const Page404 = () => {
  return (
    <>
      <NextSeo title="404" />
      <div className="flex min-h-[70vh] flex-col justify-center">
        <motion.div
          animate={animate}
          transition={transition}
          className="w-full md:w-[70%] lg:w-[60%] mx-auto sm:max-w-xs md:max-w-sm mb-10"
        >
          <h1 className="font-semibold text-xl text-center">
            페이지를 찾을 수 없어요.
          </h1>
        </motion.div>

        <div className="my-4">
          <div className="text-center">
            <Link href="/">
              <a className="text-gray-500">
                <span className="">홈으로 이동</span>
                <FontAwesomeIcon
                  className="pl-1.5"
                  size="sm"
                  icon={faShoePrints}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
