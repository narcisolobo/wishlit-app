export type User = {
  id: string | undefined;
  email: string | undefined;
  role: string | undefined;
} | null;

export type AuthAction =
  | { type: 'SIGN_UP'; payload: User }
  | { type: 'SIGN_IN'; payload: User }
  | { type: 'SIGN_OUT'; payload: null };

export const authReducer = (state: User, action: AuthAction): User => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGN_UP' || 'SIGN_IN':
      if (payload !== null) {
        return {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        };
      }
    case 'SIGN_OUT':
      return payload;
    default:
      return state;
  }
};
