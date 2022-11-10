import type { NavigationItems } from '~/components/navbar/navbar';

export const navigation: NavigationItems = [
  {
    icon: 'chat-1-line',
    link: '/chat/library',
  },
  {
    icon: 'alarm-warning-line',
    items: [
      {
        title: 'Create alert',
        icon: 'add-line',
        link: '/alert/create',
      },
    ],
  },
];

export const noLayout = ['/login', '/embed'];
