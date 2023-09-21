import { BeeInterface } from 'interfaces/bee';
import { HarvestInterface } from 'interfaces/harvest';
import { HealthCheckInterface } from 'interfaces/health-check';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HiveInterface {
  id?: string;
  location: string;
  creation_date?: any;
  destruction_date?: any;
  user_id: string;
  hive_status: string;
  created_at?: any;
  updated_at?: any;
  bee?: BeeInterface[];
  harvest?: HarvestInterface[];
  health_check?: HealthCheckInterface[];
  user?: UserInterface;
  _count?: {
    bee?: number;
    harvest?: number;
    health_check?: number;
  };
}

export interface HiveGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  user_id?: string;
  hive_status?: string;
}
