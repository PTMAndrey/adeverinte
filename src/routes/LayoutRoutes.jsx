
export const getLinksForRoute = (user, segment) => {
  // Aici adaugi logica pentru a returna link-urile specifice fiecărei rute
  switch (segment) {
    case 'users':
      return [
        { text: 'Users', path: '/users' },
      ];
    case '/':
      return [
        { text: 'Dashboard', path: '/' },
      ];
    case 'secretariat':
      return [
        { text: 'Secretariat', path: '/secretariat' },
      ];
    case 'studenti':
      return [
        { text: 'Studenti', path: '/studenti' },
      ];
    case 'notifications':
      return [
        { text: 'Notifications', path: '/notifications' },
      ];
    default:
      return [];
  }
};