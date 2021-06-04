import { BaseService } from '../infrastructure';

/**
 * A service for revoking all API permissions (making the access token unusable after this).
 */
export class ApiPermissions extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
      super(shopDomain, accessToken, "api_permissions");
    }

    /**
     * Deletes all api permissions for this app (revokes access token).
     */
    public delete() {
      return this.createRequest<void>("DELETE", `current.json`);
  }
}

export default ApiPermissions;
