import { IgnoreTests, Matcher, MatchError } from 'alsatian';

declare var process: { env: any; };

const env: { [prop: string]: string } = process.env;

// Grab secret keys
export const Config = {
    apiKey: env["API_KEY"] || env["GITHUB_API_KEY"],
    secretKey: env["SECRET_KEY"] || env["GITHUB_SECRET_KEY"],
    shopDomain: env["SHOP_DOMAIN"] || env["GITHUB_SHOP_DOMAIN"],
    accessToken: env["ACCESS_TOKEN"] || env["GITHUB_ACCESS_TOKEN"],
}


if (!Config.apiKey) {
    throw new Error(`Expected 'apiKey' in process.env to exist.`);
}

if (!Config.secretKey) {
    throw new Error(`Expected 'secretKey' in process.env to exist.`);
}

if (!Config.shopDomain) {
    throw new Error(`Expected 'shopDomain' in process.env to exist.`);
}

if (!/https:\/\//.test(Config.shopDomain)) {
    throw new Error(`Expected 'shopDomain' to be a full URL with 'https://' protocol.`);
}

if (!Config.accessToken) {
    throw new Error(`Expected 'accessToken' in process.env to exist.`);
}

export function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

@IgnoreTests("Not a test fixture")
export class MatcherExtension extends Matcher<any> {
    constructor(value) {
        super(value);
    }

    // readonly not: MatcherExtension;

    /**
     * Checks that a value conforms to a regular expression
     * @param regex - the regular expression that the actual value should match
     * @see https://github.com/alsatian-test/alsatian/blob/2.0.x/core/matchers/string-matcher.ts
     */
    public toMatch(regex: RegExp) {
        if (regex === null || regex === undefined) {
        throw new TypeError("toMatch regular expression must not be null or undefined.");
        }

        if (typeof this.actualValue !== "string") {
        throw new TypeError("toMatch must only be used to match on strings.");
        }

        if (!regex.test(this.actualValue) === this.shouldMatch) {
        throw new MatchError(this.actualValue, regex, this.shouldMatch);
        }
    }

    /**
     * Checks that a string contains another string or an array contains a specific item
     * @param expectedContent - the string or array item that the value should contain
     * @see https://github.com/alsatian-test/alsatian/blob/2.0.x/core/matchers/container-matcher.ts
     */
    public toContain(expectedContent: string) {
        if (this.actualValue instanceof Array === false && typeof this.actualValue !== "string") {
        throw new TypeError("toContain must only be used to check whether strings or arrays contain given contents.");
        }

        if (typeof this.actualValue === "string" && typeof expectedContent !== "string") {
        throw new TypeError("toContain cannot check whether a string contains a non string value.");
        }

        if ((this.actualValue as any).indexOf(expectedContent) === -1 === this.shouldMatch) {
        throw new MatchError(this.actualValue, expectedContent, this.shouldMatch);
        }
    }

    toBeType(expectedType: string) {
        const actualType = typeof(this.actualValue);
        const typesMatch= actualType === expectedType;

        if (this.shouldMatch && ! typesMatch) {
            throw new MatchError(`expected ${actualType} to be ${expectedType}.`, expectedType, actualType);
        } 
        
        if (! this.shouldMatch && typesMatch) {
            throw new MatchError(`expected ${actualType} to not be ${expectedType}.`, `not ${expectedType}`, actualType);
        }
    }

    toBeAnArray() {
        const isArray = Array.isArray(this.actualValue);
        const actualType = typeof(this.actualValue);

        if (this.shouldMatch && !isArray) {
            throw new MatchError(`expected value to be an array, but its type was ${actualType}.`, `an array`, `type ${actualType}`);
        }

        if (! this.shouldMatch && isArray) {
            throw new MatchError(`expected value to not be an array, but it was.`, `not an array`, `an array`);
        }
    }

    toBeGreaterThan(value: number) {
        return this.toBeGreaterThanOrEqualTo(value - 1);
    }

    toBeGreaterThanOrEqualTo(value: number) {
        const isGte = this.actualValue >= value;
        
        if (this.shouldMatch && ! isGte) {
            throw new MatchError(`expected value to be greater than or equal to ${value}, but it was not.`, `greater than or equal to ${value}`, this.actualValue);
        }

        if (! this.shouldMatch && isGte) {
            throw new MatchError(`expected value to not be greater than or equal to ${value}, but it was.`, `not greater than or equal to ${value}`, this.actualValue);
        }
    }

    toBeLesserThan(value: number) {
        return this.toBeLesserThanOrEqualTo(value + 1);
    }

    toBeLesserThanOrEqualTo(value: number) {
        const isLte = this.actualValue <= value;
        
        if (this.shouldMatch && ! isLte) {
            throw new MatchError(`expected value to be lesser than or equal to ${value}, but it was not.`, `lesser than or equal to ${value}`, this.actualValue);
        }

        if (! this.shouldMatch && isLte) {
            throw new MatchError(`expected value to not be lesser than or equal to ${value}, but it was.`, `not lesser than or equal to ${value}`, this.actualValue);
        }
    }

    toBeNullOrUndefined() {
        const isNullOrUndefined = this.actualValue === null || this.actualValue === undefined;

        if (this.shouldMatch && !isNullOrUndefined) {
            throw new MatchError(`expected value to be null or undefined, but it was not.`, `null or undefined`, this.actualValue);
        }

        if (! this.shouldMatch && isNullOrUndefined) {
            throw new MatchError(`expected value to not be null or undefined, but it was.`, `not null or undefined`, this.actualValue === null ? `null` : `undefined`);
        }
    }

    itemsToPassValidator<T>(validator: (item: T) => void) {
        if (!this.shouldMatch) {
            throw new MatchError(`Custom .itemsToPassValidator function is not useable with .not.`);
        }

        const values: any [] = this.actualValue;
        let error: MatchError | undefined;

        try {
            values.forEach(item => validator(item));
        } catch (_e) {
            error = _e;
        }


        if (this.shouldMatch && !!error) {
            throw error;
        }
    }
}

export const Expect = (value) => new MatcherExtension(value);