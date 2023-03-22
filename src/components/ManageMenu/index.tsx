import { useState } from "react";
import type { Donut } from "../../../types";
import { motion } from "framer-motion";
import Container from "../Container";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Title = ({ title, center }: { title: string, center?:boolean }) => {
  return (
    <p className={`text-2xl text-headingColor font-semi-bold capitalize relative before:absolute before:rounded before:content before:w-32 before:h-1 before:-bottom-2 ${center? "before:left-6":"before:left-0"} before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100`}>
      {title}
    </p>
  );
};

export const PrevNext = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <motion.div whileTap={{scale:1.1}} onClick={onPrev} className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
          <MdChevronLeft className = "text-lg text-white" />
      </motion.div>
      <motion.div whileTap={{scale:1.1}} onClick = {onNext} className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
          <MdChevronRight className = "text-lg text-white" />
      </motion.div>
    </div>
  );
};

export const ManageMenuDisplay = ({
  donuts,
}: {
  donuts: Donut[];
}) => {
  const [scrollValue, setScrollValue] = useState(0);
  return (
    <section className="w-full my-5">
      <div className="w-full flex items-center justify-between">
        <Title title="Manage Menu" />
        <PrevNext
          onNext={() => setScrollValue(10000)}
          onPrev={() => setScrollValue(-10000)}
        />
      </div>
      <Container
        className="bg-containerbg"
        scrollOffset={scrollValue}
        items={donuts}
        admin={true}
      />
    </section>
  );
};
