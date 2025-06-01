import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../src/Pages/Home";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Suppress console.log output during test runs
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

// Mock child components
jest.mock("../src/Components/FooterUser", () => () => (
  <div data-testid="footer" />
));
jest.mock("../src/Components/Trend", () => () => <div data-testid="trend" />);
jest.mock("../src/Components/Header", () => () => <div data-testid="header" />);
jest.mock("../src/Components/Tweet", () => () => <div data-testid="tweet" />);

// Mock HomeController methods
jest.mock("../src/Controllers/HomeController", () => ({
  loadHomeTweets: jest.fn(),
  postTweet: jest.fn(),
  postComment: jest.fn(),
  fetchSearchResults: jest.fn(),
}));

// Helper to render component with router context
const renderWithRouter = (component, route = "/home/john") => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/home/:user" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Home Component", () => {
  test("renders core UI components", () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Vad vill du säga?")
    ).toBeInTheDocument();
    expect(screen.getByTestId("trend")).toBeInTheDocument();
    const tweets = screen.queryAllByTestId("tweet");
    expect(Array.isArray(tweets)).toBe(true);
  });

  test("loads tweets on initial render", () => {
    const { loadHomeTweets } = require("../src/Controllers/HomeController");
    renderWithRouter(<Home />);
    expect(loadHomeTweets).toHaveBeenCalled();
  });

  test("updates tweet input on user typing", () => {
    renderWithRouter(<Home />);
    const textarea = screen.getByPlaceholderText("Vad vill du säga?");
    fireEvent.change(textarea, { target: { value: "Hej världen!" } });
    expect(textarea.value).toBe("Hej världen!");
  });
});
