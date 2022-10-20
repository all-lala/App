import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { TabItem } from '~/components/chat/chat-settings/tab-item';
import { File } from '~/components/forms/file/file';
import { Input } from '~/components/forms/input/input';
import { Switch } from '~/components/forms/switch/switch';
import type { AlertElementLottieSettings } from '~/types/schemas/alert';

export interface LottieSettingsProps {
  settings: AlertElementLottieSettings;
  onSettingsChange?: (key: string, settings: unknown) => void;
}

export const LottieSettings = (props: LottieSettingsProps) => {
  const { settings, onSettingsChange } = props;
  const [currentSettings, setCurrentSettings] = useState(settings);
  const [isLottieFile, setIsLottieFile] = useState(false);

  useEffect(() => {
    setCurrentSettings(settings);
    settings.url.includes('lottiefiles.com') && setIsLottieFile(true);
  }, [settings]);

  return (
    <>
      <Switch
        label="Use LottieFiles"
        className="mb-3"
        checked={currentSettings.url.includes('lottiefiles.com')}
        onChange={setIsLottieFile}
      />
      {isLottieFile ? (
        <TabItem title="Lottie Animation URL">
          <Input
            defaultValue={currentSettings.url}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              onSettingsChange && onSettingsChange('url', target.value);
            }}
          />
        </TabItem>
      ) : (
        <TabItem title="Lottie JSON">
          {currentSettings.url && (
            <>
              <Input value={currentSettings.url} className="mb-3" disabled />
              <Button
                color={ButtonColor.Error}
                size={ButtonSize.Very_Small}
                onClick={() => onSettingsChange?.('url', null)}
              >
                Delete Lottie animation
              </Button>
            </>
          )}
          {!currentSettings.url && <File accept={{ 'application/json': ['.json'] }} maxSize={5} />}
        </TabItem>
      )}
    </>
  );
};
