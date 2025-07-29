import type { Coin } from '@cosmjs/amino';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { GasPrice, SigningStargateClient } from '@cosmjs/stargate';

import { getMantraConfig, MANTRA_TESTNET_CONFIG } from '@/constants/config';

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export class MantraService {
  private client: SigningStargateClient | null = null;
  private wallet: DirectSecp256k1Wallet | null = null;
  private config = getMantraConfig();

  async initialize(): Promise<boolean> {
    try {
      if (!this.config.privateKey) {
        throw new Error('Private key not configured');
      }

      // Create wallet from private key with correct address prefix
      this.wallet = await DirectSecp256k1Wallet.fromKey(
        Buffer.from(this.config.privateKey, 'hex'),
        'mantra' // Use 'mantra' as the address prefix
      );

      // Create signing client
      this.client = await SigningStargateClient.connectWithSigner(this.config.rpcUrl, this.wallet, {
        gasPrice: GasPrice.fromString(this.config.gasPrice)
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize Mantra service:', error);
      return false;
    }
  }

  async getAccountInfo(): Promise<{ address: string; balance: string } | null> {
    try {
      if (!this.client || !this.wallet) {
        throw new Error('Client not initialized');
      }

      const accounts = await this.wallet.getAccounts();
      const address = accounts[0]?.address ?? '';

      const balance = await this.client.getBalance(address, MANTRA_TESTNET_CONFIG.denom);

      return {
        address,
        balance: balance.amount
      };
    } catch (error) {
      console.error('Failed to get account info:', error);
      return null;
    }
  }

  async sendTransaction(): Promise<TransactionResult> {
    try {
      if (!this.client || !this.wallet) {
        throw new Error('Client not initialized');
      }

      if (!this.config.recipientAddress) {
        throw new Error('Recipient address not configured');
      }

      console.log(this.wallet.getAccounts());
      const accounts = await this.wallet.getAccounts();
      const senderAddress = accounts[0]?.address ?? '';

      // Create the transfer message
      const amount: Coin = {
        denom: MANTRA_TESTNET_CONFIG.denom,
        amount: this.config.amount
      };

      const gasLimit = parseInt(this.config.gasLimit);

      // Send the transaction
      const result = await this.client.sendTokens(senderAddress, this.config.recipientAddress, [amount], gasLimit);

      return {
        success: true,
        txHash: result.transactionHash
      };
    } catch (error) {
      console.error('Transaction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getTransactionStatus(txHash: string): Promise<{ status: string; details?: unknown }> {
    try {
      if (!this.client) {
        throw new Error('Client not initialized');
      }

      const result = await this.client.getTx(txHash);

      if (!result) {
        return { status: 'not_found' };
      }

      return {
        status: result.code === 0 ? 'success' : 'failed',
        details: result
      };
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return {
        status: 'error',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  formatAmount(amount: string): string {
    const numericAmount = parseInt(amount);
    return (numericAmount / Math.pow(10, MANTRA_TESTNET_CONFIG.coinDecimals)).toFixed(6);
  }
}
