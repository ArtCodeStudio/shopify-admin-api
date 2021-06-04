import * as Options from '../options';
import { Transaction } from '../interfaces';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating an order's transactions.
 */
export class Transactions extends BaseService {
  constructor(shopDomain: string, accessToken: string) {
      super(shopDomain, accessToken, "orders");
  }

    private getPath(orderId: number, path: string) {
        return this.joinUriPaths(`${orderId}/transactions`, path);
    }

    /**
     * Creates a new transaction.
     * @param orderId Id of the order that the transaction will belong to.
     * @param transaction The transaction being created.
     */
    public create(orderId: number, transaction: Partial<Transaction>) {
        return this.createRequest<Transaction>("POST", this.getPath(orderId, ".json"), "transaction", { transaction });
    }

    /**
     * Gets an transaction with the given id.
     * @param orderId Id of the order that the transaction belongs to.
     * @param transactionId Id of the transaction being retrieved.
     * @param options Options for filtering the result.
     */
    public get(orderId: number, transactionId: number, options?: Options.TransactionBaseOptions) {
        return this.createRequest<Transaction>("GET", this.getPath(orderId, `${transactionId}.json`), "transaction", options);
    }

    /**
     * Lists up to 250 transactions for the given order.
     * @param orderId Id of the order that the transactions belong to.
     * @param options Options for filtering the results.
     */
    public list(orderId: number, options?: Options.TransactionListOptions) {
        return this.createRequest<Transaction[]>("GET", this.getPath(orderId, ".json"), "transactions", options);
    }

    /**
     * Counts the transactions on the given order.
     * @param orderId Id of the order that the transactions belong to.
     * @param options Options for filtering the results.
     */
    public count(orderId: number) {
        return this.createRequest<number>("GET", this.getPath(orderId, "count.json"), "count");
    }

}

export default Transactions;