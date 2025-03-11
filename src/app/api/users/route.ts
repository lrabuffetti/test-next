// src/app/api/users/route.ts
import { NextResponse } from "next/server";

interface GitHubUser {
	id: number;
	login: string;
	html_url: string;
	avatar_url: string;
	name: string | null;
}

export async function GET() {
	try {
		const response = await fetch("https://api.github.com/users");

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const users: GitHubUser[] = await response.json();

		return NextResponse.json(users);
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
