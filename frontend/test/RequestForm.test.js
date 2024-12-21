/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import RequestForm from '../src/components/RequestForm'
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn()
Storage.prototype.getItem = jest.fn((key) => {
    if (key == "token") {
        return "abc.fake.token";
    }
    else if (key == "username") {
        return "MockUsername";
    }
    else return undefined;
});

beforeAll(() => {
    delete window.location;
    window.location = { replace: jest.fn() };
})

beforeEach(() => {
    fetch.mockClear();
    window.location.replace.mockClear();
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

test('sends request data correctly', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {}
        }
    });

    const user = userEvent.setup();
    render(<RequestForm />);
    const textInputs = screen.queryAllByRole("textbox");
    const titleInput = textInputs[0];
    const descriptionInput = textInputs[1];
    const infoInput = textInputs[2];
    const costInput = screen.getByRole("spinbutton");
    const buttons = screen.queryAllByRole("button");
    const cancelButton = buttons[0]
    const submitButton = buttons[1]

    await user.type(titleInput, "Test Title");
    await user.type(descriptionInput, "blah");
    await user.type(infoInput, "hmm");
    await user.type(costInput, "120");
    await user.click(submitButton);

    await new Promise(process.nextTick);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/requests",{headers: {'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Bearer abc.fake.token'}, method: "POST", body: "{\"title\":\"Test Title\",\"description\":\"blah\",\"cost\":\"120\"}"});
    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith("/user_requests.html");
});

test('validates empty title', async () => {
    const user = userEvent.setup();
    render(<RequestForm />);

    const buttons = screen.queryAllByRole("button");
    const cancelButton = buttons[0]
    const submitButton = buttons[1]

    await user.click(submitButton);
    expect(screen.getByText("Title cannot be empty!")).toBeInTheDocument();
});

test('validates empty description', async () => {
    const user = userEvent.setup();
    render(<RequestForm />);

    const textInputs = screen.queryAllByRole("textbox");
    const titleInput = textInputs[0];
    const buttons = screen.queryAllByRole("button");
    const cancelButton = buttons[0]
    const submitButton = buttons[1]

    await user.type(titleInput, "Test Title");
    await user.click(submitButton);

    expect(screen.getByText("Description cannot be empty!")).toBeInTheDocument();
});
