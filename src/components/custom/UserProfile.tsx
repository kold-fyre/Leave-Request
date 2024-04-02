import { LoginContext } from '@/contexts/login.context';
import { useContext } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

	const nav = useNavigate();

	const { loginState, setLoginState } = useContext(LoginContext);

	const handleLogout = () => {
		setLoginState(null);
        nav('/login');
	}

	return (
		loginState && (
			<Popover>
				<PopoverTrigger>
					<div className="max-w-[200px] w-fit flex items-center gap-x-2 me-4 md:me-10">
						<div className="rounded-full border min-w-10 h-10 bg-black/20"></div>

						<div className="flex flex-col overflow-hidden text-start">
							<span className="text-sm truncate">
								{loginState.loggedInUser.name}
							</span>
							<span className="text-xs text-gray-300">
								{loginState.loggedInUser.position}
							</span>
						</div>
					</div>
				</PopoverTrigger>

				<PopoverContent className="mt-4 me-1">
					<div className="">
						<div
							className={`py-2 px-4 rounded-lg flex items-center gap-x-2 text-red-500 border border-transparent hover:border-red-500 cursor-pointer`}
							onClick={handleLogout}>
							<span className="scale-75">
								<LogOutIcon />
							</span>
							<span className="text-sm"> Logout </span>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		)
	);
};

export default UserProfile;
