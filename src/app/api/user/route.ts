import { NextResponse } from "next/server";
import { GitHubUser } from "@/utils/types";

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	try {
		const { username } = params;

		if (!username) {
			return NextResponse.json(
				{ message: "Username is required" },
				{ status: 400 }
			);
		}

		const response = await fetch(`https://api.github.com/users/${username}`);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const user: GitHubUser = await response.json();

		return NextResponse.json(user);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json(
				{ message: "An unexpected error occurred" },
				{ status: 500 }
			);
		}
	}
}
