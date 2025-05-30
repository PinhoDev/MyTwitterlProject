import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../src/Pages/SignUp";

// Mocks básicos
jest.mock("../src/Controllers/SignUpController", () => ({
  validateForm: jest.fn(() => ""),
  createNewUser: jest.fn(() => Promise.resolve({ success: true })),
}));

import {
  validateForm,
  createNewUser,
} from "../src/Controllers/SignUpController";

describe("SignUp Page", () => {
  test("renders form fields", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Användarnamn")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Lösenord")).toBeInTheDocument();
  });

  test("calls createNewUser when form is submitted correctly", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Lösenord"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bekräfta lösenord"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /skapa konto/i }));

    await waitFor(() => {
      expect(createNewUser).toHaveBeenCalled();
    });
  });
});
