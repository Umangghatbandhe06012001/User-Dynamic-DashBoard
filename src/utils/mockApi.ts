import mockData from '../mockData.json';

type AuthUser = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type LoginError = {
  error: string;
};

export const mockLoginApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  
  const users = mockData.AuthUsers as AuthUser[];


  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  return { token: mockData.token };
};
