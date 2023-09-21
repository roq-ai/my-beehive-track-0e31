import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  description?: string;
  team_leader?: string;
  team_size?: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;

  user?: UserInterface;
  _count?: {};
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  team_leader?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
