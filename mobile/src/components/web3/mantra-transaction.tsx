import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '@/components/button';
import { getMantraConfig } from '@/constants/config';
import { MantraService } from '@/services/mantra';

interface Props {
  name: string;
  type: string;
}

export const MantraTransactionButton: React.FC<Props> = ({ name, type }) => {
  const [mantraService] = useState(() => new MantraService());
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = getMantraConfig();

  const handleSendTransaction = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Service not initialized');
      return;
    }

    if (!config.recipientAddress) {
      Alert.alert('Error', 'Recipient address not configured');
      return;
    }

    setIsLoading(true);

    try {
      const result = await mantraService.sendTransaction();

      if (result.success && result.txHash) {
        setTimeout(() => checkTransactionStatus(result.txHash!), 5000);
      } else {
        Alert.alert('Transaction Failed', result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      Alert.alert('Error', 'Failed to send transaction');
    }
  };

  const checkTransactionStatus = async (txHash: string) => {
    try {
      const status = await mantraService.getTransactionStatus(txHash);

      if (status.status === 'success') {
        router.navigate({
          pathname: '/(dashboard)/(transactions)/success',
          params: {
            name: `${name} ${type === 'ETFS' ? 'ETF' : type === 'RWAS' ? 'RWA' : 'STOCK'}`,
            txHash
          }
        });
      } else if (status.status === 'failed') {
        Alert.alert('Failed', `Transaction failed!\nHash: ${txHash}`);
      }
    } catch (error) {
      console.error('Status check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeService = useCallback(async () => {
    setIsLoading(true);
    try {
      const success = await mantraService.initialize();
      setIsInitialized(success);

      if (success) {
        // await loadAccountInfo();
      } else {
        Alert.alert('Initialization Failed', 'Failed to initialize Mantra service. Please check your configuration.', [
          { text: 'OK' }
        ]);
      }
    } catch (error) {
      console.error('Initialization error:', error);
      Alert.alert('Error', 'Failed to initialize service');
    } finally {
      setIsLoading(false);
    }
  }, [mantraService]);

  useEffect(() => {
    initializeService();
  }, [initializeService]);

  if (isLoading && !isInitialized) {
    return (
      <Button mt="auto" mb={16} variant="primary" isLoading>
        Initializing...
      </Button>
    );
  }

  return (
    <Button
      mt="auto"
      mb={16}
      variant="primary"
      onPress={handleSendTransaction}
      isLoading={isLoading}
      disabled={!isInitialized || isLoading}
    >
      Submit
    </Button>
  );
};
