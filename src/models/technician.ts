
export interface Technician {
    role: string;
    id: string;
    profile: Profile;
    account: Account,
    stay_at: any;
    created_at: Date;
    deleted_at?: Date;
  }