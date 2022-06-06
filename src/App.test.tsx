import { render, waitFor } from "@testing-library/react";
import App from "./App";

test("renders App component", async () => {
    const { getByText } = render(<App />);

    await waitFor(() => {
        const label = getByText(/Name or email address/i);
        expect(label).toBeInTheDocument();
    });
});
