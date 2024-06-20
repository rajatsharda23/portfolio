import siri from '../assets/icons/siri.png';

interface SiriMessageProps {
  message?: string;
  className?: string;
}

const SiriMessage: React.FC<SiriMessageProps> = ({ message = "Hey there, I'm Siri!", className }) => {
  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <div className="h-10 w-10">
        <img src={siri} alt="siriLogo" className="h-10 w-10" />
      </div>
      <div className="flex flex-col">
        <div className="min-w-40 max-w-[75%] lg:max-w-[60%] min-h-12 p-2 pr-3 border border-gray-400 rounded-xl overflow-hidden bg-blue-900 bg-opacity-50 bg-blend-overlay">
          {message}
        </div>
      </div>
    </div>
  );
}

export default SiriMessage;
