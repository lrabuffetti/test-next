import UserItem from "@/ui/user-item";
import { GitHubUser } from "@/utils/types";

interface UserListProps {
	title: string;
	users: GitHubUser[];
}

export default function UserList({ title, users }: UserListProps) {
	return (
		<div>
			<h2>{title}</h2>
			<ul className="grid grid-cols-3 gap-4">
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</ul>
		</div>
	);
}
