import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '~/components/button/button';
import MediaLibrary from './media-library';

export default {
  component: MediaLibrary,
  title: 'Medias/MediaLibrary',
} as ComponentMeta<typeof MediaLibrary>;

const Template: ComponentStory<typeof MediaLibrary> = (args) => <MediaLibrary {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Trigger</Button>,
  onItemSelect: (file) => console.log(file),
};
