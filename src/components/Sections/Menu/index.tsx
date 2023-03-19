import { useEffect, useState } from "react";
import { ServerUrl } from "../../../consts";
import Container from "../../Container";
//import { FilterFood } from "../../../utils/filters";
//import Filters from "../../Filters";
import { Title } from "..";
//import { useStateValue } from "../../../context/StateProvider";

const Menu = ({ title }: { title?: string }) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [donuts, setDonuts] = useState([]);
  useEffect(() => {
    fetch(`${ServerUrl}/api/donuts`)
     .then((response) => response.json())
     .then((data) => {
      console.log(data);
      setDonuts(data);
     })
     .catch((err) => {
        console.log(err.message);
     })
   }, []);
   console.log(donuts);
  return (
    <section className="w-full my-0" id="menu">
      <div className="w-full flex items-center justify-between">
        <Title title="Fan Favorites" />
      </div>
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={donuts}
      />
    </section>
  );
};

export default Menu;
