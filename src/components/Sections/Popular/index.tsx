import { PrevNext as PrevNextButtons, Title } from "..";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

const Fruits = () => {
  // filter by fruits
  // Here could be anything that we want...
  const [scrollValue, setScrollValue] = useState(0);
  const [ { DonutItems } , dispatch] = useStateValue();
  const featuredDonut = FilterFood(DonutItems, "featured");
  return (
    <section className="w-full my-5">
      <div className="w-full flex items-center justify-between">
        <Title title="Best Sellers" />
        <PrevNextButtons
          onNext={() => setScrollValue(10000)}
          onPrev={() => setScrollValue(-10000)}
        />
      </div>
      <Container
        className="bg-containerbg"
        scrollOffset={scrollValue}
        items={featuredDonut}
      />
    </section>
  );
};

export default Fruits;
