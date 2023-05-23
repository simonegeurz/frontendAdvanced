import {
    render,
    screen
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Feed from "../feed/feed";
import React from "react";
import {
    useAuth0
} from '@auth0/auth0-react';

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234"
};

jest.mock("@auth0/auth0-react");

describe("Get component tests", () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn()
        });
    });

    it("Test render", async () => {
        render(
            <MemoryRouter>
                <Feed />
            </MemoryRouter>
        );

        const header = await screen.findByText("Test comment");
        expect(header).toBeInTheDocument();

    });
});
