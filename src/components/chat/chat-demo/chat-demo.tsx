import { motion } from 'framer-motion';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { generateTwitchMessage } from '~/utils/chat/generate-chat-message';
import type { ChatTheme, TwitchMessage } from '~/types/schemas/chat';

export interface ChatDemoProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
  messagesPerMinute?: number;
}

export const ChatDemo = (props: ChatDemoProps) => {
  const { settings, messagesPerMinute } = props;
  const [messages, setMessages] = useState<TwitchMessage[]>([]);

  useEffect(() => {
    const timeInterval = messagesPerMinute === undefined ? 1250 : 60000 / messagesPerMinute;

    const interval =
      timeInterval === Infinity
        ? undefined
        : setInterval(
            () =>
              setMessages((d) => {
                if (d.length >= 50) d.shift();
                const newMessage: TwitchMessage = generateTwitchMessage();
                return [...d, newMessage];
              }),
            timeInterval
          );

    return () => clearInterval(interval);
  }, [messagesPerMinute]);

  return (
    <>
      {messages.map((message: TwitchMessage) => (
        <motion.div
          key={message.id}
          className="w-full"
          layout={settings.global.animation !== 'none'}
        >
          <ChatMessage settings={settings} message={message} />
        </motion.div>
      ))}
    </>
  );
};
