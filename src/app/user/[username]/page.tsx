import UserProfile from "@/components/user-profile";
import { GitHubUserProfile } from "@/utils/types";

interface UserPageProps {
	params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
	const resolvedParams = await params;
	const { username } = resolvedParams;

	const user = await fetchUser(username);

	if (!user) {
		return <p>User not found</p>;
	}

	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8 mt-8">
			<h1 className="text-3xl">User Profile</h1>
			<UserProfile user={user} />
		</div>
	);
}

async function fetchUser(username: string): Promise<GitHubUserProfile | null> {
	try {
		const response = await fetch(`https://api.github.com/users/${username}`);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const user: GitHubUserProfile = await response.json();
		return user;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		return null;
	}
}
