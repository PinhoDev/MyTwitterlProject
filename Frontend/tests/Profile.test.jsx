import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../src/Pages/Profile";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Suppress global fetch calls
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          result: true,
          userDetails: {
            name: "Test",
            username: "testuser",
            following: [],
            tweets: [],
          },
        }),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

// Suppress console.log output during test runs
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

// Mock child components
jest.mock("../src/Components/FooterUser", () => () => (
  <div data-testid="footer" />
));
jest.mock("../src/Components/Trend", () => () => <div data-testid="trend" />);
jest.mock("../src/Components/Tweet", () => () => <div data-testid="tweet" />);
jest.mock("../src/Components/SearchBar", () => ({ onSearch }) => (
  <div data-testid="searchbar" />
));
jest.mock("../src/Components/SearchOverlay", () => () => (
  <div data-testid="searchoverlay" />
));
jest.mock("../src/Components/FollowButton", () => () => (
  <div data-testid="follow-button" />
));

// Mock controller functions
jest.mock("../src/Controllers/ProfileController", () => ({
  loadUserDetails: jest.fn((username, setUserDetails) =>
    setUserDetails({
      name: "Test User",
      username: "testuser",
      tweets: [
        {
          content: "Hello world",
          createdAt: new Date().toISOString(),
          comments: [],
        },
      ],
      followers: [],
      following: [],
    })
  ),
}));
jest.mock("../src/Controllers/HomeController", () => ({
  fetchSearchResults: jest.fn(),
  postComment: jest.fn(),
}));

// Mock localStorage
beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => "currentUser");
});

// Helper function
const renderWithRouter = (component, route = "/profile/testuser") => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/profile/:user" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Profile Component", () => {
  test("renders basic UI components", async () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("searchbar")).toBeInTheDocument();
    expect(screen.getByTestId("trend")).toBeInTheDocument();
  });

  test("loads and displays user tweet count", async () => {
    renderWithRouter(<Profile />);
    await waitFor(() =>
      expect(screen.getByText("1 Tweets")).toBeInTheDocument()
    );
  });
});
