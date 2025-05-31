import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LogInPassword from "../src/Pages/LogInPassword";
import { navigateToHomePage } from "../src/Controllers/LoginController.js";

// Mock the controller function
jest.mock("../src/Controllers/LoginController.js", () => ({
  navigateToHomePage: jest.fn(),
}));

describe("LogInPassword Page", () => {
  test("shows error when password is empty", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/password",
            state: { emailOrUsername: "test@example.com" },
          },
        ]}
      >
        <Routes>
          <Route path="/password" element={<LogInPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logga in/i }));

    expect(screen.getByText("Du måste ange lösenord")).toBeInTheDocument();
  });

  test("calls navigateToHomePage with correct arguments", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/password",
            state: { emailOrUsername: "test@example.com" },
          },
        ]}
      >
        <Routes>
          <Route path="/password" element={<LogInPassword />} />
        </Routes>
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText("Lösenord");
    fireEvent.change(passwordInput, { target: { value: "myPassword123" } });

    fireEvent.click(screen.getByRole("button", { name: /logga in/i }));

    expect(navigateToHomePage).toHaveBeenCalledWith(
      "test@example.com",
      "myPassword123",
      expect.any(Function),
      expect.any(Function)
    );
  });
});
