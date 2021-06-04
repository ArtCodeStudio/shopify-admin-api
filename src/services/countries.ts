import BaseService from "../infrastructure/base_service";
import { Country } from "../interfaces/country";
import { FieldOptions } from "../options/base";
import { CountryListOptions } from "../options/country";

export default class Countries extends BaseService {

    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "countries");
    }

    /**
     * Gets a count of all of the shop's countries.
     * @param options Options for filtering the results.
     */
    public count() {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Gets a list of up to 250 of the shop's countries.
     * @param options Options for filtering the results.
     */
    public list(options?: CountryListOptions) {
        return this.createRequest<Country[]>("GET", ".json", "countries", options);
    }
    /**
     * Gets the country with the given id.
     * @param countryId The country's id.
     * @param options Options for filtering the results.
     */
    public get(countryId: number, options?: FieldOptions) {
        return this.createRequest<Country>("GET", `${countryId}.json`, "country", options);
    }

    /**
     * Creates an country.
     * @param country The country being created.
     * @param options Options for creating the country.
     */
    public create(country: Country) {
        return this.createRequest<Country>("POST", ".json", "country", { country });
    }

    /**
     * Updates an country with the given id.
     * @param id The country's id.
     * @param country The updated country.
     */
    public update(id: number, country: Country) {
        return this.createRequest<Country>("PUT", `${id}.json`, "country", { country });
    }

    /**
     * Deletes an country with the given id.
     * @param id The country's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}