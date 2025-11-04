import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../ui/Button";

describe("Button Component", () => {
  it("should render with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should apply variant classes", () => {
    const { container } = render(<Button variant="primary">Test</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("should show spinner when loading", () => {
    render(<Button isLoading>Loading</Button>);
    const spinner = screen.getByRole("img", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("should be disabled when loading", () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should apply size classes", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("text-sm");
  });
});
