import { AlertViewer } from '~/components/alert/alert-viewer/alert-viewer';
import { Editor } from '~/components/alert/editor/editor';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';
import type { AlertElements } from '~/types/schemas/alert';
import type { Milliseconds, Pixels } from '~/types/types/custom';

export interface AlertEditorContainerProps {
  size: string;
  totalTime: Milliseconds;
  elements: AlertElements;
  timestamp: Milliseconds;
  onElementMove?: (id: string, x: Pixels, y: Pixels) => void;
  onElementResize?: (id: string, width: Pixels, height: Pixels) => void;
  onElementClick?: (id: string) => void;
}

export const AlertEditorContainer = (props: AlertEditorContainerProps) => {
  const { elements, onElementMove, onElementResize, onElementClick, timestamp, totalTime, size } =
    props;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.5);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  return (
    <div className="relative flex h-[calc(100vh_-_300px)] items-center justify-center overflow-hidden rounded-2xl bg-black">
      <Modal
        trigger={
          <Button
            className="absolute top-2 right-2 z-10"
            size={ButtonSize.Very_Small}
            color={ButtonColor.Accent}
          >
            Preview
          </Button>
        }
        title="Preview"
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      >
        <AlertViewer
          width={500 as Pixels}
          height={500 as Pixels}
          elements={elements}
          totalTime={totalTime}
        />
      </Modal>

      <Editor
        size={size}
        timestamp={timestamp}
        isHover={(hover) => setIsHover(hover)}
        elements={elements}
        onElementMove={onElementMove}
        onElementResize={onElementResize}
        onElementClick={onElementClick}
        zoom={zoom}
      />
    </div>
  );
};
