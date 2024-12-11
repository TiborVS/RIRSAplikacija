/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import RequestTable from '../src/components/RequestTable'

test("renders correctly without users", async () => {
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
    render(<RequestTable requests={requests} includeUsers={false}/>);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("columnheader")).toHaveLength(5);
    // TODO continue expect statements
})