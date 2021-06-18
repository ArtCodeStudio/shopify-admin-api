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

@TestFixture("Customer Tests")
export class CustomerTests {
    private service = new AdminApi.Customers(Config.shopDomain, Config.accessToken);

    private created: AdminApi.Interfaces.Customer[] = [];

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

    @AsyncTest("should count customers")
    @Timeout(5000)
    public async TestCount() {
        const count = await this.service.count();

        Expect(count).toBeGreaterThan(0);
    }

    @AsyncTest("should list customers")
    @Timeout(5000)
    public async TestList() {
        const list = await this.service.list();

        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<AdminApi.Interfaces.Customer>(i => {
            Expect(i).toBeType("object");
            Expect(i.id).toBeGreaterThan(0);
        })
    }

    private async create(email: string, scheduleForDeletion = true) {
        const createData: Partial<AdminApi.Models.Customer> = {
            email: email,
            first_name: "Test",
            last_name: "User"
        }
        let customerCreateResult: AdminApi.Models.Customer;
        try {
            customerCreateResult = await this.service.create(createData);
        } catch (error) {
            console.error(error);
            throw error;
        }
        

        if (scheduleForDeletion) {
            this.created.push(customerCreateResult);
        }
        return customerCreateResult;
    }

    @AsyncTest("should create a customer")
    @Timeout(5000)
    public async TestCreate() {
        const customer = await this.create("createtest" + Date.now() + "@example.com");

        Expect(customer).toBeType("object");
        Expect(customer.email).toBeType("string");
        Expect(customer.first_name).toEqual("Test");
        Expect(customer.last_name).toEqual("User");
        Expect(customer.state).toEqual("disabled");
    }

    @AsyncTest("should update a customer")
    @Timeout(5000)
    public async TestUpdate() {
        const originalEmail = "updatetest" + Date.now() + "@example.com";
        const customerId = (await this.create(originalEmail)).id;

        const email = "updatedemail" + Date.now() + "@example.com";
        const first_name = "NewTest";
        const last_name = "NewUser";
        const updatedCustomer = await this.service.update(customerId, {
          email,
          first_name,
          last_name
        });

        Expect(updatedCustomer).toBeType("object");
        Expect(updatedCustomer?.email).toEqual(email);
        Expect(updatedCustomer?.first_name).toEqual(first_name);
        Expect(updatedCustomer?.last_name).toEqual(last_name);
    }

    @AsyncTest("should delete a customer")
    @Timeout(5000)
    public async TestDelete() {
      const deleteAddress = "testdelete" + Date.now() + "@example.com"
      const id = (await this.create(deleteAddress, false)).id;
      let error;

      try {
        await this.service.delete(id);
      } catch (e) {
        error = e;
      }

      Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should generate an activation url")
    @Timeout(5000)
    public async TestCreateActivationUrl() {
        const id = (await this.create("testactivation" + Date.now() + "@example.com")).id;
        const url = await this.service.createActivationUrl(id);
        Expect(url).toContain(`${Config.shopDomain}/account/activate/`);
    }
}