import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from ".";
import { GitHubUserProfile } from "@/utils/types";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

const mockUser: GitHubUserProfile = {
	login: "octocat",
	avatar_url: "https://github.com/images/error/octocat_happy.gif",
	name: "The Octocat",
	bio: "A test GitHub user",
	followers: 100,
	following: 50,
	public_repos: 42,
	location: "GitHub HQ",
	company: "GitHub",
	blog: "https://github.blog",
	twitter_username: "octocat",
	created_at: "2011-01-25T18:44:36Z",
	html_url: "https://github.com/octocat",
	id: 0,
	type: "",
	email: null,
	updated_at: "",
};

describe("UserProfile", () => {
	it("renders user profile correctly", () => {
		render(<UserProfile user={mockUser} />);

		expect(screen.getByText("The Octocat")).toBeInTheDocument();
		expect(screen.getByText("A test GitHub user")).toBeInTheDocument();
		expect(
			screen.getByText((content, element) => {
				return (
					element?.textContent === "Followers: 100" ||
					element?.textContent === "Followers:100"
				);
			})
		).toBeInTheDocument();

		expect(
			screen.getByText((content, element) => {
				return (
					element?.textContent === "Following: 50" ||
					element?.textContent === "Following:50"
				);
			})
		).toBeInTheDocument();

		expect(
			screen.getByText((content, element) => {
				return (
					element?.textContent === "Public Repos: 42" ||
					element?.textContent === "Public Repos:42"
				);
			})
		).toBeInTheDocument();

		expect(screen.getByText("GitHub HQ")).toBeInTheDocument();
		expect(
			screen.getByRole("img", { name: "octocat's avatar" })
		).toBeInTheDocument();
	});

	it("navigates back when clicking the Back button", () => {
		const pushMock = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push: pushMock });

		render(<UserProfile user={mockUser} />);

		const backButton = screen.getByRole("button", { name: "Back" });
		fireEvent.click(backButton);

		expect(pushMock).toHaveBeenCalledWith("/");
	});
});
