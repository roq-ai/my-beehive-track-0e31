const mapping: Record<string, string> = {
  bees: 'bee',
  harvests: 'harvest',
  'health-checks': 'health_check',
  hives: 'hive',
  teams: 'team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
