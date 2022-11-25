import { EventListSettings } from '~/components/event-list/event-list-settings';

export const EventListCreate = () => {
  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <EventListSettings />
      </div>
    </div>
  );
};
