/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import UserRequestPage from '../src/pages/UserRequestPage';
import { act } from 'react';

global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
})

const requests = [
    {
        id: 1,
        title: "Request 1",
        description: "Description for request 1",
        cost: 100,
        status: "pending",
        user: "User123"
    },
    {
        id: 2,
        title: "Request 2",
        description: "Description for request 2",
        cost: 200,
        status: "accepted",
        user: "User123"
    },
    {
        id: 3,
        title: "Request 3",
        description: "Description for request 3",
        cost: 300,
        status: "denied",
        user: "User123"
    }
];

test('renders static parts correctly', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {[]},
    });
    render(<UserRequestPage />)
    expect(screen.getByText("My requests")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("New request");
    expect(link).toHaveAttribute("href", "new_request.html");
})

test('renders retrieved request data correctly', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => requests,
    });
    await act(() => {
        render(<UserRequestPage />);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/requests");

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(5);

    expect(screen.queryAllByText("Title")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Description")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Cost")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Status")[0]).toBeInTheDocument();

    expect(screen.queryAllByRole("row")).toHaveLength(4);
})