import { NextResponse } from "next/server";
import { GitHubUserSearchResult } from "@/utils/types";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q");

		if (!query) {
			return NextResponse.json(
				{ message: "Search term (q) is required" },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`https://api.github.com/search/users?q=${encodeURIComponent(query)}`
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const searchResults: GitHubUserSearchResult = await response.json();

		return NextResponse.json(searchResults);
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
