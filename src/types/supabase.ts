export interface Database {
  public: {
    Tables: {
      interviews: {
        Row: {
          id: string;
          title: string;
          description: string;
          avatar_url: string | null;
          company: string;
          duration_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          avatar_url?: string | null;
          company: string;
          duration_minutes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          avatar_url?: string | null;
          company?: string;
          duration_minutes?: number;
          created_at?: string;
        };
      };
    };
  };
}