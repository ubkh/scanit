//export default jest.createMockFromModule('expo-router');

export const useSegments = jest.fn(() => [
    { /* segment data */ },
    { /* segment data */ },
  ]);

// export const useSegments = jest.fn();

export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}));

// export default new Proxy({}, {
//     get: function(target, prop, receiver) {
//       if (prop === 'useSegments') {
//         return useSegments;
//       }
//       return jest.fn(() => ({}));
//     }
//   });

// jest.mock('expo-router', () => ({
//     __esModule: true,
//     useSegments: jest.fn(),
//     useRouter: jest.fn(() => ({
//         push: jest.fn(),
//         replace: jest.fn(),
//         back: jest.fn(),
//     })),
//   }));

