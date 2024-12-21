/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import RequestTable from '../src/components/RequestTable'

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

test("renders correctly without users", async () => {
    render(<RequestTable requests={requests} includeUsers={false}/>);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(5);

    expect(screen.queryAllByText("Title")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Description")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Cost")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Status")[0]).toBeInTheDocument();

    expect(screen.queryAllByRole("row")).toHaveLength(4);
})

test("renders correctly with users", async () => {
    render(<RequestTable requests={requests} includeUsers={true}/>);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(6);

    expect(screen.queryAllByText("User")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Title")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Description")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Cost")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Status")[0]).toBeInTheDocument();
    
    expect(screen.queryAllByRole("row")).toHaveLength(4);
})