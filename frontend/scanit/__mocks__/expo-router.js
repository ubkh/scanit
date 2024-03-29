
export const useSegments = jest.fn(() => [
    { /* segment data */ },
    { /* segment data */ },
  ]);


export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}));

export const Link = jest.fn().mockImplementation(({ children }) => children);

export const usePathname = jest.fn(() => "/");


