/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../src/components/Header'

test('displays service name', async () => {
    render(<Header siteTitle={"MyService123"} username={"User123"}/>)
    expect(screen.getByRole("heading")).toHaveTextContent("MyService123")
})

test('displays username', async () => {
    render(<Header siteTitle={"MyService123"} username={"User123"}/>)
    expect(screen.getByText("User123")).toBeInTheDocument()
})

test('does not display admin with regular user', async () => {
    render(<Header siteTitle={"MyService123"} username={"User123"} isAdmin={false}/>)
    screen.getAllByRole("heading").forEach((heading) => {
        expect(heading).not.toHaveTextContent("Admin")
    })
})

test('displays admin with admin user', async () => {
    render(<Header siteTitle={"MyService123"} username={"User123"} isAdmin={true}/>)
    expect(screen.getByText("Admin")).toBeInTheDocument()
})
