interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Beekeeper'],
  customerRoles: ['Guest'],
  tenantRoles: ['Beekeeper'],
  tenantName: 'Team',
  applicationName: 'My beehive tracker',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read user information',
    'Read team information',
    'Read bee information',
    'Read hive information',
  ],
  ownerAbilities: ['Manage bee species', 'Manage hive status', 'Manage harvest data', 'Manage health check results'],
  getQuoteUrl: 'https://app.roq.ai/proposal/a806225f-293e-4ac8-8831-abb31dc29e26',
};
