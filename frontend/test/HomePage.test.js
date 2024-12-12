/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../src/pages/HomePage'

test('renders correctly', async () => {
    render(<HomePage serviceName={"MyService"}/>)
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(screen.getByText("MyService")).toBeInTheDocument();

    expect(screen.queryAllByRole("button")).toHaveLength(2);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    expect(screen.queryAllByRole("link")[0]).toHaveAttribute("href", "login.html");
    expect(screen.queryAllByRole("link")[1]).toHaveAttribute("href", "register.html");
})
