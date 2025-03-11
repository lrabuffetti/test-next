import { GitHubUser } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserItem = ({ user }: { user: GitHubUser }) => {
	const router = useRouter();
	return (
		<li
			key={user.id}
			className="flex-1 basis-1/3 p-4 border border-gray-200 rounded-lg justify-center items-center flex cursor-pointer"
			onClick={() => router.push(`/user/${user.login}`)}
		>
			<Image
				src={user.avatar_url}
				alt={`${user.login}'s avatar`}
				width={50}
				height={50}
				style={{
					borderRadius: "50%",
					marginRight: "10px",
				}}
			/>
			<div>
				<a href={`/user/${user.login}`} rel="noopener noreferrer">
					{user.name || user.login}
				</a>
				<br />
				<small>@{user.login}</small>
			</div>
		</li>
	);
};

export default UserItem;
