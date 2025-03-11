"use client";

import { useEffect, useState } from "react";
import { GitHubUserProfile } from "@/utils/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";

interface UserProfileProps {
	username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
	const router = useRouter();
	const [user, setUser] = useState<GitHubUserProfile | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isStarred, setIsStarred] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(
					`https://api.github.com/users/${username}`
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data: GitHubUserProfile = await response.json();
				setUser(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, [username]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p style={{ color: "red" }}>{error}</p>;
	}

	if (!user) {
		return <p>No user found</p>;
	}

	const toggleStar = () => {
		setIsStarred((prev) => !prev);
	};

	return (
		<div className="flex justify-center items-center flex-col gap-8 bg-white/50 p-8 rounded-lg shadow-lg">
			<div className="flex justify-between w-full items-center">
				<button
					className="cursor-pointer rounded-sm border p-[1rem] hover:bg-gray-100 hover:text-gray-800"
					onClick={() => router.push("/")}
				>
					Back
				</button>
				<Star
					className={`cursor-pointer ${
						isStarred ? "fill-yellow-400" : "fill-none"
					}`}
					onClick={toggleStar}
				/>
			</div>

			<h1 className="text-xl">{user.name || user.login}</h1>
			<Image
				src={user.avatar_url}
				alt={`${user.login}'s avatar`}
				style={{ width: "100px", height: "100px", borderRadius: "50%" }}
				width={100}
				height={100}
			/>
			<p>{user.bio}</p>
			<ul>
				<li>
					<strong>Followers:</strong> {user.followers}
				</li>
				<li>
					<strong>Following:</strong> {user.following}
				</li>
				<li>
					<strong>Public Repos:</strong> {user.public_repos}
				</li>
				<li>
					<strong>Location:</strong> {user.location || "Not specified"}
				</li>
				<li>
					<strong>Company:</strong> {user.company || "Not specified"}
				</li>
				<li>
					<strong>Blog: </strong>
					{user.blog ? <a href={user.blog}>{user.blog}</a> : "Not specified"}
				</li>
				<li>
					<strong>Twitter:</strong> {user.twitter_username || "Not specified"}
				</li>
				<li>
					<strong>Joined:</strong>{" "}
					{new Date(user.created_at).toLocaleDateString()}
				</li>
			</ul>
		</div>
	);
};

export default UserProfile;
