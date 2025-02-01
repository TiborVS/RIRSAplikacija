/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import RegisterPage from '../src/pages/RegisterPage'
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn();

beforeAll(() => {
    delete window.location;
    window.location = { replace: jest.fn() };
});

beforeEach(() => {
    fetch.mockClear();
    window.location.replace.mockClear();
});

test('renders form correctly', async () => {
    render(<RegisterPage />);

    expect(screen.queryAllByText("Register")).toHaveLength(2); // title text and button text
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Repeat password")).toBeInTheDocument();

    expect(screen.queryAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("repeatPassword")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
});

test('sends registration data correctly', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {
                token: "abc.fake.token",
                username: "MockUsername"
            }
        }
    });

    const user = userEvent.setup();
    render(<RegisterPage />);
    const textInputs = screen.queryAllByRole("textbox");
    const usernameInput = textInputs[0];
    const emailInput = textInputs[1];
    const passwordInput = screen.getByTestId("password");
    const repeatPasswordInput = screen.getByTestId("repeatPassword");
    const submitButton = screen.getByRole("button");

    await user.type(usernameInput, "User123");
    await user.type(emailInput, "user.123@site.org");
    await user.type(passwordInput, "password123");
    await user.type(repeatPasswordInput, "password123");
    await user.click(submitButton);

    await new Promise(process.nextTick);

    expect(fetch).toHaveBeenCalledTimes(1);
    //expect(fetch).toHaveBeenCalledWith("http://localhost:8000/users/",{headers: {'Accept': 'application/json','Content-Type': 'application/json'}, method: "POST", body: "{\"username\":\"User123\",\"password\":\"password123\",\"email\":\"user.123@site.org\"}"});
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith("/user_requests.html");
});