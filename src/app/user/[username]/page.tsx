import UserProfile from "@/components/user-profile";

export default function UserPage({ params }: { params: { username: string } }) {
	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8 mt-8">
			<h1 className="text-3xl">User Profile</h1>
			<UserProfile username={params.username} />
		</div>
	);
}
