import siri from '../assets/icons/siri.png';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type {
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

interface SiriMessageProps {
  message?: string;
  className?: string;
}

const SiriMessage: React.FC<SiriMessageProps> = ({ message = "Hey there, I'm Siri!", className }) => {

  const sanitizeSchema = defaultSchema;

  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <div className="h-10 w-10 flex-shrink-0">
        <img src={siri} alt="siriLogo" className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col">
        <div className="min-w-40 max-w-[75%] lg:max-w-[60%] min-h-12 p-2 pr-3 border border-gray-400 rounded-xl overflow-hidden bg-blue-900 bg-opacity-50 bg-blend-overlay">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, sanitizeSchema]]}
            components={{
              a: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-300 underline hover:text-blue-200"
                >
                  {children}
                </a>
              ),
              code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: ReactNode }) {
                const content = String(children);
                if (inline) {
                  return (
                    <code
                      className={`px-1 py-0.5 rounded bg-blue-800/60 text-blue-100 ${className ?? ''}`}
                      {...props}
                    >
                      {content}
                    </code>
                  );
                }
                return (
                  <pre className="my-2 max-w-full overflow-x-auto rounded bg-blue-800/60 p-2 text-blue-100">
                    <code className={className} {...props}>
                      {content}
                    </code>
                  </pre>
                );
              },
              img: ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
                // Constrain images so they don't blow up the chat bubble
                <img
                  src={src ?? ''}
                  alt={alt ?? ''}
                  className="my-2 max-w-full rounded"
                  loading="lazy"
                  {...props}
                />
              ),
              p: (props: HTMLAttributes<HTMLParagraphElement>) => (
                // Preserve intentional line breaks within paragraphs
                <p className="whitespace-pre-wrap leading-relaxed">{props.children}</p>
              ),
              ul: (props: HTMLAttributes<HTMLUListElement>) => (
                <ul className="list-disc pl-5 space-y-1">{props.children}</ul>
              ),
              ol: (props: HTMLAttributes<HTMLOListElement>) => (
                <ol className="list-decimal pl-5 space-y-1">{props.children}</ol>
              ),
              blockquote: (props: HTMLAttributes<HTMLElement>) => (
                <blockquote className="border-l-4 border-blue-400/60 pl-3 italic text-blue-100/90">
                  {props.children}
                </blockquote>
              )
            } as Components}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default SiriMessage;
