export type UserRole = 'admin' | 'user';
export type ViewMode = 'grid' | 'list';

export interface UserSettings {
  viewMode: ViewMode;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  settings: UserSettings;
}
