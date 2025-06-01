import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogIn from "../src/Pages/LogIn.jsx";
import { navigateToLoginPassword } from "../src/Controllers/LoginController.js";

// Mock the login controller function
jest.mock("../src/Controllers/LoginController.js", () => ({
  navigateToLoginPassword: jest.fn(),
}));

describe("LogIn Page", () => {
  test("renders the login form with title, input, and button", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Logga in på Twitter")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("E-postadress eller användarnamn")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nästa/i })).toBeInTheDocument();
  });

  test("calls navigateToLoginPassword when valid input is submitted", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(
      "E-postadress eller användarnamn"
    );
    const button = screen.getByRole("button", { name: /nästa/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(navigateToLoginPassword).toHaveBeenCalledWith(
      "test@example.com",
      expect.any(Function),
      expect.any(Function)
    );
  });
  test("shows error message when user name  is not found", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(
      "E-postadress eller användarnamn"
    );
    const button = screen.getByRole("button", { name: /nästa/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.getByText("Fältet får inte vara tomt")).toBeInTheDocument();
  });

  test("shows error message when input is empty", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /nästa/i });

    fireEvent.click(button);

    expect(screen.getByText("Fältet får inte vara tomt")).toBeInTheDocument();
  });
});
