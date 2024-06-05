import siri from '../assets/icons/siri.png'

interface SiriMessageProps {
  message?: string
}

const SiriMessage: React.FC<SiriMessageProps> = ({ message = "Hey there, I'm Siri!" }) => {
  return (
    <div className='flex items-center space-x-2'>
      <div className='h-10 w-10'>
        <img src={siri} alt="siriLogo" className='h-10 w-10 sticky' />
      </div>
     <div className=''> 
        <div className='flex left-0 min-w-40 max-w-5xl min-h-12 p-2 pr-3 border border-gray-400 rounded-xl overflow-hidden bg-blue-900 bg-opacity-50 bg-blend-overlay'>
            {message}
        </div>
     </div>
    </div>
  )
}

export default SiriMessage