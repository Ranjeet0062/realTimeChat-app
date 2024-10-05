// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

const Message = () => {
	// const { authUser } = useAuthContext();
	// const { selectedConversation } = useConversation();
	// const fromMe = message.senderId === authUser._id;
	// const formattedTime = extractTime(message.createdAt);
	// const chatClassName = fromMe ? "chat-end" : "chat-start";
	// const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	// const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	// const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat`}>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center justify-center'>12-10-20</div>
			<div className=" flex items-center ">
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='profile' src="data:image/jpeg;base64,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" />
				</div>
			</div>
			<div className="">hello</div>
			</div>
			
		</div>
	);
};
export default Message;
