import { Color } from '../forms/color/color';
import { Input } from '../forms/input/input';
import { Slider } from '../forms/slider/slider';

export type DemoContainerProps = {
  children: React.ReactNode;
  messagesPerMinute?: number;
  onMessagesPerMinuteChange?: (perMinute: number) => void;
  className?: string;
};

const DemoContainer = (props: DemoContainerProps) => {
  const { children, messagesPerMinute, onMessagesPerMinuteChange } = props;
  const [color, setColor] = useState<string>('#040508');

  return (
    <div
      style={{ backgroundColor: color }}
      className="relative flex h-[calc(100vh_-_80px)] flex-1 flex-col items-end justify-end overflow-hidden rounded-2xl bg-dark-600 p-10"
    >
      {children}
      <div className="absolute inset-0 flex h-14 w-full items-center justify-between bg-dark-600/40 px-2 backdrop-blur-sm">
        {onMessagesPerMinuteChange ? (
          <Slider
            className="flex-1"
            max={120}
            min={0}
            value={[messagesPerMinute || 0]}
            haveInput={true}
            inputSuffix="mess/min"
            onChange={(values) => onMessagesPerMinuteChange(values[0])}
          />
        ) : null}
        <Color haveInput={false} value={color} onColorChange={setColor} />
      </div>
    </div>
  );
};

export default DemoContainer;
