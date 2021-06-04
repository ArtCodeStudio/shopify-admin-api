import { BaseService } from '../infrastructure';
import { AccessScope } from '../interfaces';

/**
 * A service for reading access scopes of the current access token
 */
export class AccessScopes extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
      super(shopDomain, accessToken, "admin/oauth/access_scopes");
    }

    /**
     * Gets a list of all access scopes enabled for this access token.
     */
     public list() {
        return this.createRequest<AccessScope[]>("GET", ".json", "access_scopes");
    }
}

export default AccessScopes;
