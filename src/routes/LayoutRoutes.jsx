
export const getLinksForRoute = (user, segment) => {
  // Aici adaugi logica pentru a returna link-urile specifice fiecărei rute
  switch (segment) {
    case '/':
      return [
        { text: 'Dashboard', path: '/' },
      ];
    case 'facultate':
      return [
        { text: 'Info', path: '/facultate/info' },
      ];
    case 'studenti':
      return [
        { text: 'Studenti', path: '/studenti/lista' },
        { text: 'Adaugă', path: '/studenti/adauga' },
      ];
    case 'adeverinte':
      return [
        { text: 'Cereri', path: '/adeverinte/cereri' },
        { text: 'Acceptate', path: '/adeverinte/acceptate' },
        { text: 'Respinse', path: '/adeverinte/respinse' },
      ];
    default:
      return [];
  }
};