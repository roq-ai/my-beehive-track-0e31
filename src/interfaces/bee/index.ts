import { HiveInterface } from 'interfaces/hive';
import { GetQueryInterface } from 'interfaces';

export interface BeeInterface {
  id?: string;
  species: string;
  hive_id: string;
  birth_date?: any;
  death_date?: any;
  queen_bee?: boolean;
  created_at?: any;
  updated_at?: any;

  hive?: HiveInterface;
  _count?: {};
}

export interface BeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  species?: string;
  hive_id?: string;
}
