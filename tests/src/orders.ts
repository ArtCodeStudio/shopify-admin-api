import * as AdminApi from '../..';
import inspect from 'logspect/bin';
import {
    AsyncSetupFixture,
    AsyncTeardownFixture,
    AsyncTest,
    IgnoreTest,
    TestFixture,
    Timeout
    } from 'alsatian';
import { Config, Expect } from './test_utils';

@TestFixture("Order Tests")
export class OrderTests {
    private service = new AdminApi.Orders(Config.shopDomain, Config.accessToken);

    private created: AdminApi.Interfaces.Order[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 3 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 3 seconds to let API rate limit empty.")
        
        await new Promise<void>(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 3000));
    }

    private async create(scheduleForDeletion = true) {

        const createData: AdminApi.Interfaces.OrderCreate = {
            billing_address: {
                address1: "123 4th Street",
                city: "Minneapolis",
                province: "Minnesota",
                province_code: "MN",
                zip: "55401",
                phone: "555-555-5555",
                first_name: "John",
                last_name: "Doe",
                company: "Tomorrow Corporation",
                country: "United States",
                country_code: "US",
                default: true,
            },
            line_items: [
                {
                    name: "Test Line Item",
                    title: "Test Line Item Title",
                    quantity: 2,
                    price: 5,
                },
                {
                    name: "Test Line Item 2",
                    title: "Test Line Item Title 2",
                    quantity: 2,
                    price: 5,
                }
            ],
            customer: {
                email: "abc" + Date.now() + "@gmail.com",
            },
            financial_status: "paid",
            total_price: 5.00,
            note: "Test note about the customer.",
        };

        const order = await this.service.create(createData, undefined, { send_receipt: false, send_fulfillment_receipt: false })

        if (scheduleForDeletion) {
            this.created.push(order);
        };

        /*
         * Wait 12 seconds because if we are using the customer create endpoint with a trial or Partner development store,
         * then we can create no more than 5 new orders per minute.
         * 60 seconds / 5 orders = 12 seconds
         * @see https://shopify.dev/docs/admin-api/rest/reference/orders/order
         */
        inspect("Waiting 12 seconds to let the order create API endpoint rate limit empty.")
        
        await new Promise<void>(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 12000));

        return {
            createData,
            order,
        }
    }

    @AsyncTest("should delete an order")
    @Timeout(25000)
    public async Test1() {
        let error: Error | undefined;

        try {
            const id = (await this.create()).order.id;
            Expect(id).toBeType("number");

            await this.service.delete(id);
        } catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create an order")
    @Timeout(25000)
    public async Test2() {
        const { order, createData } = (await this.create());

        Expect(order).toBeType("object");
        
        
        if (createData.customer?.email) {
            Expect(createData.customer?.email).toBeType("string");
            Expect(order.contact_email).toBe(createData.customer?.email);
        }
        
        Expect(order.id).toBeType("number")
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should get an order")
    @Timeout(25000)
    public async Test3() {
        const id = (await this.create()).order.id;

        Expect(id).toBeType("number");

        const order = await this.service.get(id);

        Expect(order).toBeType("object");
        Expect(order.contact_email).toBeType("string");
        Expect(order.id).toBeType("number")
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should create an order with only one field")
    @Timeout(25000)
    public async Test4() {
        const id = (await this.create()).order.id;

        Expect(id).toBeType("number");

        const order = await this.service.get(id, { fields: "id" })

        Expect(order).toBeType("object");
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
        Expect(Object.getOwnPropertyNames(order).every(key => key === "id")).toBe(true);
    }

    @AsyncTest("should count orders")
    @Timeout(25000)
    public async Test5() {
        await this.create();

        const count = await this.service.count();

        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list orders")
    @Timeout(25000)
    public async Test6() {
        await this.create();

        const list = await this.service.list();

        Expect(list).toBeAnArray();

        if (!list) {
            return;
        }

        list.forEach(order => {
            Expect(order).toBeType("object");
            Expect(order.id).toBeGreaterThanOrEqualTo(1);

            if (order.contact_email !== null) {
                Expect(order.contact_email).toBeType("string");
            }
        })
    }

    @AsyncTest("should update an order")
    @Timeout(25000)
    public async Test7() {
        const id = (await this.create()).order.id;

        Expect(id).toBeType("number");

        const note = "Updated note";
        const order = await this.service.update(id, { note })

        Expect(order).toBeType("object");
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
        Expect(order.note).toEqual(note);
    }

    @AsyncTest("should close an order")
    @Timeout(25000)
    public async Test8() {
        const id = (await this.create()).order.id;
        Expect(id).toBeType("number");
        const order = await this.service.close(id);

        Expect(order).toBeType("object");
        Expect(order.closed_at).toBeType("string")
        Expect(order.closed_at).not.toBeNullOrUndefined();
    }

    @AsyncTest("should open an order")
    @Timeout(25000)
    public async Test9() {
        const id = (await this.create()).order.id;
        Expect(id).toBeType("number");

        await this.service.close(id);

        const order = await this.service.open(id);

        Expect(order).toBeType("object");
        Expect(order?.closed_at).toBeNullOrUndefined();
    }

    @AsyncTest("should cancel an order")
    @Timeout(25000)
    public async Test10() {
        const id = (await this.create()).order.id;
        Expect(id).toBeType("number");
        const order = await this.service.cancel(id);
    
        Expect(order).toBeType("object");
        Expect(order.id).toEqual(id);
    }

    @AsyncTest("should cancel an order with options")
    @Timeout(25000)
    public async Test11() {
        const id = (await this.create()).order.id;
        Expect(id).toBeType("number");

        const order = await this.service.cancel(id, {
            reason: "customer",
        })

        Expect(order).toBeType("object");
        Expect(order?.id).toEqual(id);
    }
}