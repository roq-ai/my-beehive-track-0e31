import { HiveInterface } from 'interfaces/hive';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HarvestInterface {
  id?: string;
  harvest_date?: any;
  quantity: number;
  hive_id: string;
  user_id: string;
  harvest_type: string;
  created_at?: any;
  updated_at?: any;

  hive?: HiveInterface;
  user?: UserInterface;
  _count?: {};
}

export interface HarvestGetQueryInterface extends GetQueryInterface {
  id?: string;
  hive_id?: string;
  user_id?: string;
  harvest_type?: string;
}
