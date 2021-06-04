import { CarrierService } from '../interfaces';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating Shopify's CarrierService API.
 */
export class CarrierServices extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "carrier_services");
    }

    /**
     * Creates a new Carrier Service.
     */
    public create(carrierService: Partial<CarrierService>) {
        return this.createRequest<CarrierService>("POST", ".json", "carrier_service", { carrier_service: carrierService });
    }

    /**
     * Updates a new Carrier Service.
     */
    public update(id: number, carrierService: Partial<CarrierService>) {
        return this.createRequest<CarrierService>("PUT", `${id}.json`, "carrier_service", { carrier_service: carrierService });
    }

    /**
     * Gets a carrier service with the given id.
     * @param id The id of the carrier servuce to get.
     */
    public get(id: number) {
        return this.createRequest<CarrierService>("GET", `${id}.json`, "carrier_service");
    }

    /**
     * Deletes a carrier service with the given id.
     * @param id The id of the carrier service to delete.
     * @return Promise<{}> returns an empty object on success
     */
    public delete(id: number) {
        return this.createRequest<{}>("DELETE", `${id}.json`, "carrier_service");
    }

    /**
     * Retrieves a list of carrier services for the shop.
     */
    public list() {
        return this.createRequest<CarrierService>("GET", `.json`, "carrier_service");
    }
}

export default CarrierServices;