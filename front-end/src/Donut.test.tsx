import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { Donut } from "./Donut";

test("renders a name", () => {
  render(<Donut kind="Glazed" />);
  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveTextContent("Kind is Glazed");
  expect(divElement).toHaveAttribute("role", "contentinfo");
});