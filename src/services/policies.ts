import { BaseService } from '../infrastructure';
import { Policy } from '../interfaces';

/**
 * A service for reading a shop's policies.
 */
export class Policies extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "policies");
    }

    /**
     * Gets a list of the shop's policies.
     */
    public list() {
        return this.createRequest<Policy[]>("GET", ".json", "policies");
    }
}

export default Policies;