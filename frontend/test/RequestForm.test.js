/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import RequestForm from '../src/components/RequestForm'

global.fetch = jest.fn()

beforeEach(() => {
    fetch.mockClear();
})

test('renders form correctly', async () => {
    render(<RequestForm isEditing={false}/>);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.queryAllByRole("textbox")).toHaveLength(3);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Links & other info")).toBeInTheDocument();
    expect(screen.getByText("Cost")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Create request")).toBeInTheDocument();
})

/* test('prefills existing form data when editing', async () => {
    render(<RequestForm isEditing={true} editRequestData={
        {
            title: "Test Title 123",
            description: "Some description here",
            info: "Some info here",
            cost: 100
        }
    }/>)
    
}) */