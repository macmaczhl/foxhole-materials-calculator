import { render, screen, fireEvent } from "@testing-library/react";
import StuffCombobox from "../app/components/StuffCombobox";

// Mock ResizeObserver for Headless UI
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("StuffCombobox", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    placeholder: "Test placeholder",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders combobox with placeholder", () => {
    render(<StuffCombobox {...defaultProps} />);

    expect(screen.getByRole("combobox")).toBeTruthy();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeTruthy();
  });

  test("does not show clear button when value and query are empty", () => {
    render(<StuffCombobox {...defaultProps} />);

    expect(screen.queryByLabelText("Clear search")).toBeNull();
  });

  test("shows clear button when value is provided", () => {
    render(<StuffCombobox {...defaultProps} value="Components" />);

    expect(screen.getByLabelText("Clear search")).toBeTruthy();
  });

  test("shows clear button when user types in search", () => {
    render(<StuffCombobox {...defaultProps} />);

    const combobox = screen.getByRole("combobox");
    fireEvent.change(combobox, { target: { value: "metal" } });

    expect(screen.getByLabelText("Clear search")).toBeTruthy();
  });

  test("clear button clears both query and selected value", () => {
    const mockOnChange = jest.fn();
    render(
      <StuffCombobox
        {...defaultProps}
        value="Components"
        onChange={mockOnChange}
      />
    );

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("clear button clears search query", () => {
    render(<StuffCombobox {...defaultProps} />);

    // Type in search
    const combobox = screen.getByRole("combobox");
    fireEvent.change(combobox, { target: { value: "steel" } });

    // Clear should be visible
    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeTruthy();

    // Click clear
    fireEvent.click(clearButton);

    // Clear button should disappear (no value, no query)
    expect(screen.queryByLabelText("Clear search")).toBeNull();
  });

  test("clear button is keyboard accessible", () => {
    const mockOnChange = jest.fn();
    render(
      <StuffCombobox
        {...defaultProps}
        value="Components"
        onChange={mockOnChange}
      />
    );

    const clearButton = screen.getByLabelText("Clear search");

    // Should be focusable
    clearButton.focus();
    expect(document.activeElement).toBe(clearButton);

    // Should work with Enter key
    fireEvent.keyDown(clearButton, { key: "Enter" });
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("adjusts padding when clear button is visible", () => {
    const { rerender } = render(<StuffCombobox {...defaultProps} />);

    const combobox = screen.getByRole("combobox");
    expect(combobox.className).toContain("pr-9"); // Only dropdown button

    // Add value to show clear button
    rerender(<StuffCombobox {...defaultProps} value="Components" />);

    expect(combobox.className).toContain("pr-16"); // Both clear and dropdown buttons
  });

  test("clear button has proper accessibility attributes", () => {
    render(<StuffCombobox {...defaultProps} value="Components" />);

    const clearButton = screen.getByLabelText("Clear search");

    expect(clearButton.getAttribute("aria-label")).toBe("Clear search");
    expect(clearButton.getAttribute("type")).toBe("button");
    expect(clearButton.getAttribute("tabIndex")).toBe("0");
  });
});
