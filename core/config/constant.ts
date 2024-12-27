export const parentMenuItems = [
  { name: 'dashboard', icon: 'mdi-home', active: true },
  { name: 'learning-content', icon: 'mdi-bookmark-box-multiple', active: false },
  { name: 'report', icon: 'mdi-file-document', active: false },
  { name: 'management', icon: 'mdi-lan-connect', active: false },
  { name: 'master-data', icon: 'mdi-folder-text', active: false },
];

export const childMenuItems = [
  {
    parentMenu: 'dashboard',
    titleMenu: 'Home',
    menuList: [
      {
        subtitleMenu: '',
        items: [
          {
            name: 'Dashboard',
            icon: 'mdi-home',
            url: '/playground',
            slug: 'dashboard',
            roleAccess: '',
          },
        ] },
    ],
  },
  {
    parentMenu: 'learning-content',
    titleMenu: 'Learning Content',
    menuList: [
      {
        subtitleMenu: 'Digital Resources',
        items: [
          { name: 'Video', icon: 'mdi-television-play', url: '/', slug: 'video', roleAccess: '', badgeMenu: false },
          { name: 'Audio', icon: 'mdi-microphone', url: '/', slug: 'audio', roleAccess: '', badgeMenu: false },
          { name: 'Article', icon: 'mdi-text-box', url: '/', slug: 'article', roleAccess: '', badgeMenu: false },
          { name: 'Document', icon: 'mdi-file', url: '/document/pdf', slug: 'document', roleAccess: '', badgeMenu: false },
          { name: 'Digilib', icon: 'mdi-library', url: '/', slug: 'digilib', roleAccess: '', badgeMenu: false },
        ],
      },
      {
        subtitleMenu: 'Structured Learning',
        items: [
          { name: 'Classroom', icon: 'mdi-school', url: '/', slug: 'classroom', roleAccess: '', badgeMenu: false },
          { name: 'Course', icon: 'mdi-book-open-variant', url: '/', slug: 'course', roleAccess: '', badgeMenu: true },
          { name: 'Program', icon: 'mdi-book-variant', url: '/', slug: 'program', roleAccess: '', badgeMenu: false },
          { name: 'Journey', icon: 'mdi-chart-timeline-variant', url: '/', slug: 'journey', roleAccess: '', badgeMenu: false },
          { name: 'Checkpoint', icon: 'mdi-checkbox-multiple-marked', url: '/', slug: 'checkpoint', roleAccess: '', badgeMenu: false },
        ],
      },
    ],
  },
  {
    parentMenu: 'report',
    titleMenu: 'Report',
    menuList: [
      {
        subtitleMenu: 'Structured Learning',
        items: [
          {
            name: 'Classroom',
            icon: 'mdi-school',
            url: '/',
            slug: 'classroom',
            roleAccess: '',
          },
        ] },
    ],
  },
  {
    parentMenu: 'management',
    titleMenu: 'Management',
    menuList: [
      {
        subtitleMenu: '',
        items: [
          {
            name: 'Users',
            icon: 'mdi-user',
            url: '/',
            slug: 'users',
            roleAccess: '',
          },
        ] },
    ],
  },
  {
    parentMenu: 'master-data',
    titleMenu: 'Master Data',
    menuList: [
      {
        subtitleMenu: '',
        items: [
          {
            name: 'Templates',
            icon: 'mdi-domain',
            url: '/',
            slug: 'template',
            roleAccess: '',
          },
        ] },
    ],
  },
];
