import { FileItem } from '~/types/schemas/file';
import { FileTypeToTag } from '~/utils/common/file-type-to-tag';

interface MediaItemProps {
  file: FileItem;
  onClickSelect?: (file: FileItem) => void;
}

const MediaItem = (props: MediaItemProps) => {
  const { file, onClickSelect } = props;

  const thumbnailContent = () => {
    switch (file.type) {
      case 0:
        return <img src={'http://localhost:3000' + file.file.url} />;
      case 1:
        return <video src={'http://localhost:3000' + file.file.url} />;
      case 2:
        return <audio src={'http://localhost:3000' + file.file.url} controls></audio>;
    }
  };

  return (
    <div onClick={() => onClickSelect && onClickSelect(file)} className="group cursor-pointer">
      <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-t-lg border-2 border-dark-400 bg-black transition-colors duration-300 group-hover:border-white">
        {thumbnailContent()}
      </div>
      <div className="rounded-b-lg bg-dark-400 p-2 transition-colors duration-300 group-hover:bg-white">
        <span className="mb-2 inline-block rounded-sm bg-primary-500 py-1 px-2 text-xs font-bold uppercase">
          {FileTypeToTag(file.file.mimeType)}
        </span>
        <p className="truncate text-xs font-semibold transition-colors duration-300 group-hover:text-black">
          {file.name}
        </p>
        <p className="text-xs text-dark-100">{Math.round(file.file.size / 1000000)} mb</p>
      </div>
    </div>
  );
};

export default MediaItem;
