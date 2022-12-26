import { Button, ButtonSize } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';
import { useUserFiles } from '~/hooks/file/use-user-files';
import { FileItem } from '~/types/schemas/file';
import MediaItem from '../media-item/media-item';
import MediaUploader from '../media-uploader/media-uploader';

interface MediaLibraryProps {
  trigger: React.ReactNode;
  title: string;
  filter?: 0 | 1 | 2 | 3;
  onItemSelect?: (file: FileItem) => void;
}

const MediaLibrary = (props: MediaLibraryProps) => {
  const { trigger, title = 'Media library', filter, onItemSelect } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { data: files } = useUserFiles();

  const filteredFiles = filter ? files?.filter((file: FileItem) => file.type === filter) : files;

  const handleSelect = (file: FileItem) => {
    onItemSelect && onItemSelect(file);
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={trigger}
        containerClassName="!w-4/5 max-h-[80vh] overflow-y-scroll custom-scrollbar !bg-dark-600"
      >
        <div className="mb-4 flex items-end gap-2">
          <MediaUploader trigger={<Button size={ButtonSize.Small}>Upload new media</Button>} />
        </div>
        {files && (
          <div className="grid grid-cols-4 gap-2">
            {filteredFiles.map((file: FileItem) => (
              <MediaItem
                key={file.id}
                file={file}
                onClickSelect={() => onItemSelect && handleSelect(file)}
              />
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MediaLibrary;
