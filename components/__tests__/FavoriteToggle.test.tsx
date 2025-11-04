import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteToggle } from "../FavoriteToggle";

describe("FavoriteToggle", () => {
  it("should render with star icon", () => {
    render(<FavoriteToggle isFavorite={false} onClick={jest.fn()} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should show filled star when favorited", () => {
    const { container } = render(
      <FavoriteToggle isFavorite={true} onClick={jest.fn()} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("fill-yellow-400");
  });

  it("should show outlined star when not favorited", () => {
    const { container } = render(
      <FavoriteToggle isFavorite={false} onClick={jest.fn()} />
    );
    const svg = container.querySelector("svg");
    expect(svg).not.toHaveClass("fill-yellow-400");
  });

  it("should call onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<FavoriteToggle isFavorite={false} onClick={handleClick} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
