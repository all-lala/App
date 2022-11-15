import { AlertEditorContainer } from '~/components/alert/alert-editor-container/alert-editor-container';
import { AlertElementSettings } from '~/components/alert/alert-element-settings/alert-element-settings';
import { AlertElementsList } from '~/components/alert/alert-elements-list/alert-element-list';
import { AlertSettings } from '~/components/alert/alert-settings/alert-settings';
import { toastr, ToastType } from '~/components/toast/toast';
import { useAlert } from '~/hooks/alert/use-alert';
import { useUpdateAlert } from '~/hooks/alert/use-update-alert';
import {
  defaultAudioElementSettings,
  defaultImageElementSettings,
  defaultLottieElementSettings,
  defaultTextElementSettings,
  defaultVideoElementSettings,
} from '~/utils/alert/default-element-settings';
import type { AlertElements } from '~/types/schemas/alert';
import type { Milliseconds, Pixels } from '~/types/types/custom';

const elementSettingsMap = {
  text: defaultTextElementSettings,
  image: defaultImageElementSettings,
  video: defaultVideoElementSettings,
  audio: defaultAudioElementSettings,
  lottie: defaultLottieElementSettings,
};

export const AlertEdit = () => {
  const [title, setTitle] = useState<string>('Coucou');
  const [duration, setDuration] = useState<Milliseconds>(5000 as Milliseconds);
  const [size, setSize] = useState<string>('1 / 1');
  const [elements, setElements] = useState<AlertElements>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<Milliseconds>(0 as Milliseconds);
  const { id } = useParams();

  const { data: alert } = useAlert(id!);
  const { mutate: updateAlert } = useUpdateAlert();

  const handleDeleteElement = (id: string) => {
    const allElements = [...elements];
    const filterElements = allElements.filter((element) => element.id !== id);
    if (filterElements.length === 0) setSelectedElement(null);
    setElements(filterElements);
  };

  const handleColorChange = (id: string, color: string) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, color };
        }
        return element;
      })
    );
  };

  const handleDurationChange = (id: string, duration: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, duration };
        }
        return element;
      })
    );
  };

  const handleStartChange = (id: string, startTime: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, start_time: startTime };
        }
        return element;
      })
    );
  };

  const handleAlertUpdate = () => {
    if (title.length < 5) {
      toastr(ToastType.Error, 'Error', 'Alert title must be at least 5 characters long');
      return;
    }

    updateAlert(
      {
        title,
        duration,
        size,
        elements,
        type: alert.type,
        id: alert.id,
      },
      {
        onSuccess: (result) => {
          console.log(result);
          //navigate(`/alerts/${result.id}/edit`);
        },
      }
    );
  };

  useEffect(() => {
    if (alert) {
      setTitle(alert.title);
      setDuration(alert.duration);
      setSize(alert.size);
      setElements(alert.elements);
    }
  }, [alert]);

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex gap-5">
        <div className="w-[350px] shrink-0">
          <AlertSettings
            title="Edit alert"
            onAlertSave={handleAlertUpdate}
            addElement={(type) => {
              const defaultElementSettings = elementSettingsMap[type];

              if (!defaultElementSettings) {
                throw new Error(`No default settings for element type ${type}`);
              }

              setElements((prev) => [...prev, defaultElementSettings()]);
            }}
            alertTitle={title}
            alertDimension={size}
            alertDuration={duration}
            onSettingsChange={(params, value) => {
              switch (params) {
                case 'title':
                  setTitle(value as string);
                  break;
                case 'duration':
                  setDuration(value as Milliseconds);
                  break;
                case 'size':
                  setSize(value as string);
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
        <div className="flex-1">
          <AlertEditorContainer
            size={size}
            totalTime={duration}
            elements={elements}
            timestamp={timestamp}
            onElementMove={(id, x, y) => {
              setElements((prev) =>
                prev.map((element) => {
                  if (element.id === id) {
                    return {
                      ...element,
                      posX: Math.round(x) as Pixels,
                      posY: Math.round(y) as Pixels,
                    };
                  }
                  return element;
                })
              );
            }}
            onElementResize={(id, width, height) => {
              setElements((prev) =>
                prev.map((element) => {
                  if (element.id === id) {
                    return {
                      ...element,
                      width: Math.round(width) as Pixels,
                      height: Math.round(height) as Pixels,
                    };
                  }
                  return element;
                })
              );
            }}
            onElementClick={(id) => setSelectedElement(id)}
          />
        </div>
        {selectedElement && (
          <div className="w-[400px] shrink-0">
            <AlertElementSettings
              element={elements.find((element) => element.id === selectedElement)}
              onSettingsChange={(key, settings) => {
                setElements((prev) =>
                  prev.map((element: any) => {
                    if (element.id === selectedElement) {
                      return {
                        ...element,
                        settings: { ...element.settings, [key]: settings },
                      };
                    }
                    return element;
                  })
                );
              }}
              onPositionChange={(position, value) => {
                setElements((prev) =>
                  prev.map((element) => {
                    if (element.id === selectedElement) {
                      return {
                        ...element,
                        [position]: value,
                      };
                    }
                    return element;
                  })
                );
              }}
              onTitleChange={(title) => {
                setElements((prev) =>
                  prev.map((element) => {
                    if (element.id === selectedElement) {
                      return { ...element, title };
                    }
                    return element;
                  })
                );
              }}
              onAnimationChange={(position, animation) => {
                setElements((prev) =>
                  prev.map((element) => {
                    if (element.id === selectedElement) {
                      return { ...element, [`animation_${position}`]: animation };
                    }
                    return element;
                  })
                );
              }}
            />
          </div>
        )}
      </div>
      <div>
        <AlertElementsList
          elements={elements}
          totalTime={duration as Milliseconds}
          onDeleteElement={handleDeleteElement}
          onColorChange={handleColorChange}
          onDurationChange={handleDurationChange}
          onStartChange={handleStartChange}
          onElementClick={(id) => {
            setSelectedElement(id);
          }}
          onOrderChange={(newOrder) => setElements(newOrder)}
          onTimestampChange={setTimestamp}
        />
      </div>
    </div>
  );
};
