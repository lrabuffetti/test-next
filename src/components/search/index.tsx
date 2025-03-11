"use client";

import { useState } from "react";
import { GitHubUserSearchResult } from "@/utils/types";

interface SearchComponentProps {
	onSearchResults: (results: GitHubUserSearchResult | null) => void;
	onSearchError: (error: string | null) => void;
}

const SearchComponent = ({
	onSearchResults,
	onSearchError,
}: SearchComponentProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		if (!searchTerm) {
			onSearchError("Please enter a search term");
			return;
		}

		setIsLoading(true);
		onSearchError(null);

		try {
			// Hacer la solicitud a la API de búsqueda
			const response = await fetch(
				`/api/search?q=${encodeURIComponent(searchTerm)}`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data: GitHubUserSearchResult = await response.json();
			onSearchResults(data);
		} catch (err) {
			onSearchError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search GitHub users..."
				className="border border-gray-100 rounded-[1rem] px-2 py-2 mr-4"
			/>
			<button
				onClick={handleSearch}
				disabled={isLoading}
				className="btn cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-gray-800 border border-gray-100 rounded-[1rem] px-4 py-2"
			>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</div>
	);
};

export default SearchComponent;
