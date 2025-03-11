"use client";

import { useEffect, useState } from "react";
import SearchComponent from "@/components/search";
import { GitHubUser, GitHubUserSearchResult } from "@/utils/types";
import UserList from "@/ui/user-list";

const Users = () => {
	const [users, setUsers] = useState<GitHubUser[]>([]);
	const [searchResults, setSearchResults] =
		useState<GitHubUserSearchResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchRandomUsers = async () => {
			try {
				const response = await fetch("/api/users");
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data: GitHubUser[] = await response.json();
				setUsers(data);
				setIsLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred"
				);
				setIsLoading(false);
			}
		};

		fetchRandomUsers();
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<h1 className="text-3xl">GitHub Users</h1>
			<SearchComponent
				onSearchResults={(results) => {
					setSearchResults(results);
					setUsers([]);
				}}
				onSearchError={setError}
			/>

			{error && <p style={{ color: "red" }}>{error}</p>}
			{searchResults ? (
				<UserList
					title={`Search Results (${searchResults.items.length})`}
					users={searchResults.items}
				/>
			) : (
				<UserList title="Random Users" users={users} />
			)}
		</div>
	);
};

export default Users;
