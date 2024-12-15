/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import UserRequestPage from '../src/pages/UserRequestPage';
import { act } from 'react';

global.fetch = jest.fn();
Storage.prototype.setItem = jest.fn();
Storage.prototype.getItem = jest.fn((key) => {
    if (key == "token") {
        return "abc.fake.token";
    }
    else if (key == "username") {
        return "MockUsername";
    }
    else return undefined;
});

beforeEach(() => {
    fetch.mockClear();
    Storage.prototype.getItem.mockClear();
})

const requests = [
    {
        _id: 1,
        title: "Request 1",
        description: "Description for request 1",
        cost: 100,
        status: "pending",
        user: "User123"
    },
    {
        _id: 2,
        title: "Request 2",
        description: "Description for request 2",
        cost: 200,
        status: "accepted",
        user: "User123"
    },
    {
        _id: 3,
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
    expect(screen.getByText("MockUsername")).toBeInTheDocument();
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
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/requests", {"headers": {"Accept": "application/json", "Authorization": "Bearer abc.fake.token"}});

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(5);

    expect(screen.queryAllByText("Title")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Description")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Cost")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Status")[0]).toBeInTheDocument();

    expect(screen.queryAllByRole("row")).toHaveLength(4);
})