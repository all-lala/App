import { DragDropContext, DropResult, Droppable, Draggable } from '@hello-pangea/dnd';
import { Duration } from '~/components/alert/duration/duration';
import { Timeline } from '~/components/alert/timeline/timeline';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { Color } from '~/components/forms/color/color';
import { timeToPixel } from '~/utils/timeline/time-converter';
import type { AlertElements } from '~/types/schemas/alert';
import type { Milliseconds } from '~/types/types/custom';

export interface AlertElementsListProps {
  elements: AlertElements;
  totalTime: Milliseconds;
  onDeleteElement?: (id: string) => void;
  onColorChange?: (id: string, color: string) => void;
  onStartChange?: (id: string, startTime: Milliseconds) => void;
  onDurationChange?: (id: string, duration: Milliseconds) => void;
  onOrderChange?: (elements: AlertElements) => void;
  onElementClick?: (id: string) => void;
  onTimestampChange?: (timestamp: Milliseconds) => void;
}

export const AlertElementsList = memo(function (props: AlertElementsListProps) {
  const {
    elements,
    totalTime,
    onDeleteElement,
    onColorChange,
    onDurationChange,
    onStartChange,
    onOrderChange,
    onElementClick,
    onTimestampChange,
  } = props;

  return (
    <div className="custom-scrollbar h-[200px] w-full overflow-y-auto rounded-xl bg-dark-600">
      <div>
        <Duration
          totalTime={totalTime}
          onTimestampChange={(timestamp) => onTimestampChange?.(timestamp)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <>
          {[...elements].reverse().map((element, index) => (
            <div
              key={element.id}
              className="flex items-center gap-2 border-b border-dark-400 py-2 pl-4"
              style={{ width: timeToPixel(totalTime) + 171 + 'px' }}
            >
              <div className="flex h-12 items-center gap-2">
                <Button
                  buttonIcon="delete-bin-line"
                  color={ButtonColor.Error}
                  size={ButtonSize.Small}
                  onClick={() => onDeleteElement && onDeleteElement(element.id)}
                />
                <Button
                  buttonIcon="arrow-up-s-line"
                  color={ButtonColor.Dark}
                  size={ButtonSize.Small}
                  type="button"
                  onClick={() => {
                    const newElements = [...elements];
                    newElements.splice(index - 1, 0, newElements.splice(index, 1)[0]);
                    onOrderChange?.(newElements);
                  }}
                />
                <Button
                  buttonIcon="arrow-down-s-line"
                  color={ButtonColor.Dark}
                  size={ButtonSize.Small}
                  type="button"
                  onClick={() => {
                    const newElements = [...elements];
                    newElements.splice(index + 1, 0, newElements.splice(index, 1)[0]);
                    onOrderChange?.(newElements);
                  }}
                />
                <Color
                  haveInput={false}
                  value={element.color}
                  onColorChange={(value) => onColorChange && onColorChange(element.id, value)}
                />
              </div>
              <Timeline
                type={element.type}
                id={element.id}
                title={element.title}
                totalTime={totalTime}
                color={element.color}
                duration={element.duration as Milliseconds}
                startTime={element.start_time as Milliseconds}
                onElementMove={(startTime) => onStartChange && onStartChange(element.id, startTime)}
                onElementResize={(duration) =>
                  onDurationChange && onDurationChange(element.id, duration)
                }
                onClick={() => onElementClick && onElementClick(element.id)}
              />
            </div>
          ))}
        </>
      </div>
    </div>
  );
});
