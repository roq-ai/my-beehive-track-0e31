import { HiveInterface } from 'interfaces/hive';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HealthCheckInterface {
  id?: string;
  check_date?: any;
  hive_id: string;
  user_id: string;
  check_result: string;
  notes?: string;
  created_at?: any;
  updated_at?: any;

  hive?: HiveInterface;
  user?: UserInterface;
  _count?: {};
}

export interface HealthCheckGetQueryInterface extends GetQueryInterface {
  id?: string;
  hive_id?: string;
  user_id?: string;
  check_result?: string;
  notes?: string;
}
