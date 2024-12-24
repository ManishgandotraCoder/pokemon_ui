import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from ".";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the footer component", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("contains About section with correct text", () => {
    render(<Footer />);
    const aboutHeading = screen.getByText("About");
    expect(aboutHeading).toBeInTheDocument();

    const aboutText = screen.getByText(
      "This application allows you to search and filter Pokémon based on type and name. Explore and learn more about your favorite Pokémon!"
    );
    expect(aboutText).toBeInTheDocument();
  });

  test("contains Quick Links section with Home link", () => {
    render(<Footer />);
    const quickLinksHeading = screen.getByText("Quick Links");
    expect(quickLinksHeading).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("contains Contact section with email and phone", () => {
    render(<Footer />);
    const contactHeading = screen.getByText("Contact");
    expect(contactHeading).toBeInTheDocument();

    const emailLink = screen.getByRole("link", {
      name: "manishgandotra@icloud.com",
    });
    expect(emailLink).toHaveAttribute("href", "manishgandotra@icloud.com");

    const phoneLink = screen.getByRole("link", { name: "+91 8800463103" });
    expect(phoneLink).toHaveAttribute("href", "tel:+1234567890");
  });

  test("displays the current year in the footer", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(
      new RegExp(`© ${currentYear} Pokémon Explorer. All rights reserved.`, "i")
    );
    expect(yearText).toBeInTheDocument();
  });
});
