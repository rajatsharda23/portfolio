
interface UserMessageProps {
    userInput: string
  }


const UserMessage:React.FC<UserMessageProps> = ({userInput}) => {

    return (
      
        <div className='flex items-center flex-row-reverse'>
            <div className='h-10 w-10 rounded-full border border-gray-300 bg-gray-200 p-1 m-2'>
                <img src="https://img.icons8.com/ios-filled/100/login-as-user.png" alt="login-as-user"
                className="sticky h-8 w-8"/>
            </div>
            <div className='min-w-40 min-h-12 p-2 border border-gray-400 rounded-xl overflow-hidden bg-blue-900 bg-opacity-50 bg-blend-overlay'>
                {userInput}
            </div>
        </div>

    )
  }
  
export default UserMessage