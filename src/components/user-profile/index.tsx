"use client";

import { useState } from "react";
import { GitHubUserProfile } from "@/utils/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatDate } from "@/utils/helpers";

interface UserProfileProps {
	user: GitHubUserProfile;
}

const UserProfile = ({ user }: UserProfileProps) => {
	const router = useRouter();
	const [isStarred, setIsStarred] = useState(false);

	if (!user) return <p>loading ...</p>;

	const toggleStar = () => {
		setIsStarred((prev) => !prev);
	};

	return (
		<div className="flex justify-center items-center flex-col gap-8 bg-white/50 p-8 rounded-lg shadow-lg min-w-lg">
			<div className="flex justify-between w-full items-center">
				<button
					className="cursor-pointer rounded-sm border p-[1rem] hover:bg-gray-100 hover:text-gray-800"
					onClick={() => router.push("/")}
				>
					Back
				</button>
				<Star
					aria-label="Star"
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
				width={100}
				height={100}
				className="rounded-full"
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
					<strong>Joined:</strong> {formatDate(user.created_at)}
				</li>
			</ul>
		</div>
	);
};

export default UserProfile;
