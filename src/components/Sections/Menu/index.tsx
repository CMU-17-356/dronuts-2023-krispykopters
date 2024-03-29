import { useEffect, useState } from "react";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";

const Menu = ({ title }: { title?: string }) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ DonutItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("all");

  return (
    <section className="w-full my-0" id="menu">
      <div className="w-full flex items-center justify-between">
        <Title title="Menu" />
      </div>
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filter === "all" ? DonutItems : FilterFood(DonutItems, filter)}
      />
    </section>
  );
};

export default Menu;
