export interface GitHubUser {
	id: number;
	login: string;
	html_url: string;
	avatar_url: string;
	name: string;
	type: string;
}

export interface GitHubUserSearchResult {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubUser[];
}

export interface GitHubUserProfile {
	id: number;
	login: string;
	html_url: string;
	avatar_url: string;
	name: string | null;
	type: string;
	public_repos: number;
	followers: number;
	following: number;
	company: string | null;
	blog: string | null;
	location: string | null;
	email: string | null;
	bio: string | null;
	twitter_username: string | null;
	created_at: string;
	updated_at: string;
}
