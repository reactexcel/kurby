// import { OutsetaClientProvider } from "./client";

// class PaymentService extends OutsetaClientProvider {
//   async getAllTransactions() {
//     try {
//       return await this.client.billing.transactions.getAll();
//     } catch (error) {
//       console.error("Failed to get transactions:", error);
//       return null;
//     }
//   }

//   async createTransaction() {
//     const transactions = await this.getAllTransactions();
//     if (transactions) {
//       this.log(transactions);
//     }
//   }
// }

// // Example usage:
// const paymentService = new PaymentService();
// paymentService.createTransaction();
