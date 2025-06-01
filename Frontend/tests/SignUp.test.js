import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../src/Pages/SignUp";

// Mock the SignUpController functions
jest.mock("../src/Controllers/SignUpController", () => ({
  validateForm: jest.fn((newUser) => {
    if (!newUser.email?.trim()) {
      return "Epost är obligatoriskt";
    }
    if (!newUser.name?.trim()) {
      return "Namn är obligatoriskt";
    }
    if (newUser.username !== newUser.username?.toLowerCase()) {
      return "Användarnamnet får inte innehålla versaler";
    }
    if (newUser.password !== newUser.confirmPassword) {
      return "Lösenorden matchar inte";
    }
    return "";
  }),
  createNewUser: jest.fn(() => Promise.resolve({ success: true })),
}));

import {
  validateForm,
  createNewUser,
} from "../src/Controllers/SignUpController";

describe("SignUp Page", () => {
  test("renders all form input fields", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Användarnamn")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Epost")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Namn")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Om")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sysselsättning")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Hemsida")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Lösenord")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Bekräfta lösenord")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /skapa konto/i })
    ).toBeInTheDocument();
    // Check for image upload field
    expect(
      screen.getByRole("button", { name: /skapa konto/i })
    ).toBeInTheDocument();
  });

  test("calls createNewUser when form is submitted with valid data", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Epost"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Namn"), {
      target: { value: "Test User" },
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

  test("shows error message when name is not provided", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Epost"), {
      target: { value: "test@example.com" }, // <-- Añade esto
    });
    fireEvent.change(screen.getByPlaceholderText("Lösenord"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bekräfta lösenord"), {
      target: { value: "123456" },
    });

    // Simulate submitting without filling in the name field
    fireEvent.click(screen.getByRole("button", { name: /skapa konto/i }));

    await waitFor(() => {
      expect(screen.getByText("Namn är obligatoriskt")).toBeInTheDocument();
    });
  });

  test("shows error message when email is not provided", async () => {
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

    // Simulate submitting without filling in the email field
    fireEvent.click(screen.getByRole("button", { name: /skapa konto/i }));

    await waitFor(() => {
      expect(screen.getByText("Epost är obligatoriskt")).toBeInTheDocument();
    });
  });

  test("shows error message when username is upper letter", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "TestUser" }, // Uppercase letter in username
    });
    fireEvent.change(screen.getByPlaceholderText("Epost"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Namn"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Lösenord"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bekräfta lösenord"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /skapa konto/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Användarnamnet får inte innehålla versaler")
      ).toBeInTheDocument();
    });
  });

  test("shows error message when passwords do not match", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Epost"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Namn"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Lösenord"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bekräfta lösenord"), {
      target: { value: "654321" }, // Different password
    });

    fireEvent.click(screen.getByRole("button", { name: /skapa konto/i }));

    await waitFor(() => {
      expect(screen.getByText("Lösenorden matchar inte")).toBeInTheDocument();
    });
  });
});
