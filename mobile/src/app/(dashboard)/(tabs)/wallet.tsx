import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Avatar, View, XStack, YStack } from 'tamagui';

import BitcoinIcon from '@/assets/icons/bitcoin.svg';
import CryptoIcon from '@/assets/icons/crypto.svg';
import ETFIcon from '@/assets/icons/etf.svg';
import BitwiseIcon from '@/assets/icons/etfs/bitwise.svg';
import FidelityIcon from '@/assets/icons/etfs/fidelity.svg';
import ISharesIcon from '@/assets/icons/etfs/ishares.svg';
import SomethingIcon from '@/assets/icons/etfs/something.svg';
import FirstDepositIcon from '@/assets/icons/first-deposit.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import RWAIcon from '@/assets/icons/rwa.svg';
import AaaiIcon from '@/assets/icons/stocks/aai.svg';
import AmznIcon from '@/assets/icons/stocks/amzn.svg';
import AppleIcon from '@/assets/icons/stocks/apple-2.svg';
import BaIcon from '@/assets/icons/stocks/ba.svg';
import MsftIcon from '@/assets/icons/stocks/msft.svg';
import NvdaIcon from '@/assets/icons/stocks/nvda.svg';
import RhmIcon from '@/assets/icons/stocks/rhm.svg';
import TeslaIcon from '@/assets/icons/stocks/tesla-2.svg';
import StockIcon from '@/assets/icons/stocks.svg';
import StocksIcon from '@/assets/icons/trade.svg';
import USDIcon from '@/assets/icons/USD.svg';
import USDCIcon from '@/assets/icons/USDC.svg';
import WithdrawIcon from '@/assets/icons/withdraw.svg';
import { ContentWrapper } from '@/components/content-wrapper';
import { H1, H3 } from '@/components/header';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { AssetItem } from '@/components/screens/wallet/asset-item';
import { AssetRow } from '@/components/screens/wallet/asset-row';
import { PlaceholderSearch } from '@/components/screens/wallet/placeholder-search';
import { TextWithChangeIndicator } from '@/components/screens/wallet/text-with-change-indicator';
import { Tabs, type Option } from '@/components/tabs';
import { TouchableOpacityWithFeedback } from '@/components/touchable-opacity-with-feedback';
import { COLORS } from '@/constants/colors';
import { childAvatarImageUri } from '@/constants/images';

export default function WalletScreen() {
  const options: Option[] = [
    {
      content: (
        <View mb={16}>
          <YStack>
            <XStack flexWrap="wrap" gap={8} mb={16}>
              <AssetItem name="NVDA" change={-0.03} icon={<NvdaIcon />} />
              <AssetItem name="TSLA" change={-0.03} icon={<TeslaIcon width={48} height={48} />} />
              <AssetItem name="AAPL" change={0.08} icon={<AppleIcon width={48} height={48} />} />
              <AssetItem name="NVDA" change={0.03} icon={<AmznIcon />} />
            </XStack>
            <XStack flexWrap="wrap" gap={8} mb={16}>
              <AssetItem name="RHM" change={0.03} icon={<RhmIcon />} />
              <AssetItem name="BA" change={-0.03} icon={<BaIcon />} />
              <AssetItem name="MSFT" change={1} icon={<MsftIcon />} />
              <AssetItem name="AAI" change={-0.03} icon={<AaaiIcon />} />
            </XStack>
          </YStack>
        </View>
      ),
      label: 'Stocks',
      value: 'stocks'
    },
    {
      content: (
        <View mb={16}>
          <YStack>
            <XStack flexWrap="wrap" gap={8} mb={16}>
              <AssetItem name="IBIT" change={-1.18} icon={<ISharesIcon />} />
              <AssetItem name="FBTC" change={1.18} icon={<FidelityIcon />} />
              <AssetItem name="GBTC" change={0.04} icon={<SomethingIcon />} />
              <AssetItem name="ARKB" change={-0.03} icon={<ISharesIcon />} />
            </XStack>
            <XStack flexWrap="wrap" gap={8} mb={16}>
              <AssetItem name="BITB" change={0.75} icon={<BitwiseIcon />} />
              <AssetItem name="BTC" change={0.08} icon={<SomethingIcon />} />
              <AssetItem name="ETHE" change={0.03} icon={<SomethingIcon />} />
              <AssetItem name="ETHA" change={-0.15} icon={<ISharesIcon />} />
            </XStack>
          </YStack>
        </View>
      ),
      label: 'ETFs',
      value: 'etfs'
    }
  ];
  return (
    <BaseLayout grow={1} px={0}>
      <StatusBar style="light" />
      <ContentWrapper>
        <YStack gap={32}>
          <XStack gap={16} items="center" pt={16}>
            <ProfileIcon />
            <PlaceholderSearch />
          </XStack>
          <XStack
            flex={1}
            bg={COLORS.grey[90]}
            borderWidth={1}
            gap={16}
            rounded={12}
            p={12}
            borderColor={COLORS.grey[80]}
            items="center"
            px={16}
          >
            <Avatar circular size="$7">
              <Avatar.Image src={childAvatarImageUri} />
              <Avatar.Fallback backgroundColor={COLORS.accent[60]} />
            </Avatar>
            <YStack gap={2} pointerEvents="none">
              <Paragraph color={COLORS.grey[30]}>Dan Williams</Paragraph>
              <H1 color={COLORS.white}>$30,600.00</H1>
              <Paragraph variant="secondary" color={COLORS.grey[30]}>
                -$0,00{'  '}
                <TextWithChangeIndicator value={-0.03} fontSize={14} />
              </Paragraph>
            </YStack>
          </XStack>
          <XStack gap={8}>
            <View flex={1}>
              <XStack
                borderColor={COLORS.grey[80]}
                items="center"
                p={8}
                bg={COLORS.grey[90]}
                borderWidth={1}
                rounded={8}
                gap={8}
              >
                <StocksIcon width={36} />
                <Paragraph variant="small" fontWeight={500} color={COLORS.grey[0]} flex={1}>
                  Trade
                </Paragraph>
              </XStack>
            </View>
            <View flex={1}>
              <XStack
                borderColor={COLORS.grey[80]}
                items="center"
                p={8}
                bg={COLORS.grey[90]}
                borderWidth={1}
                rounded={8}
                gap={8}
              >
                <FirstDepositIcon width={36} />
                <Paragraph variant="small" fontWeight={500} color={COLORS.grey[0]} flex={1}>
                  Add money
                </Paragraph>
              </XStack>
            </View>
            <View flex={1}>
              <XStack
                borderColor={COLORS.grey[80]}
                items="center"
                p={8}
                bg={COLORS.grey[90]}
                borderWidth={1}
                rounded={8}
                gap={8}
              >
                <WithdrawIcon width={32} />
                <Paragraph
                  variant="small"
                  fontWeight={500}
                  color={COLORS.grey[0]}
                  flex={1}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Withdraw
                </Paragraph>
              </XStack>
            </View>
          </XStack>
          <YStack gap={8}>
            <AssetRow
              name="BTC"
              icon={<BitcoinIcon />}
              abbr="Bitcoin"
              value="0.1 BTC"
              secondValue="$10.000"
              change={-0.03}
              variant="bigger"
            />
            <AssetRow name="US Dollar" icon={<USDIcon />} abbr="USD" value="$800" variant="bigger" />
            <AssetRow name="USD Coin" icon={<USDCIcon />} abbr="USDC" value="$1000" variant="bigger" />
          </YStack>
          <View>
            <H3 color={COLORS.grey[0]}>Products</H3>
            <XStack flexWrap="nowrap" width="100%" py={16} mb={16}>
              <View flex={1}>
                <TouchableOpacityWithFeedback onPress={() => router.navigate('/(dashboard)/(transactions)/stocks')}>
                  <YStack gap={8} items="center">
                    <StockIcon />
                    <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                      Stocks
                    </Paragraph>
                  </YStack>
                </TouchableOpacityWithFeedback>
              </View>
              <View flex={1}>
                <TouchableOpacityWithFeedback onPress={() => router.navigate('/(dashboard)/(transactions)/etfs')}>
                  <YStack gap={8} items="center" flex={1}>
                    <ETFIcon />
                    <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                      ETFs
                    </Paragraph>
                  </YStack>
                </TouchableOpacityWithFeedback>
              </View>
              <View flex={1}>
                <TouchableOpacityWithFeedback onPress={() => router.navigate('/(dashboard)/(transactions)/rwas')}>
                  <YStack gap={8} items="center" flex={1}>
                    <RWAIcon />
                    <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                      RWAs
                    </Paragraph>
                  </YStack>
                </TouchableOpacityWithFeedback>
              </View>
              <View flex={1}>
                <YStack gap={8} items="center" flex={1}>
                  <CryptoIcon />
                  <Paragraph text="center" color={COLORS.grey[40]} variant="small">
                    Crypto
                  </Paragraph>
                </YStack>
              </View>
            </XStack>
          </View>
        </YStack>
      </ContentWrapper>
      <View bg={COLORS.white} px={16} borderTopLeftRadius={16} borderTopRightRadius={16} pt={16}>
        <H3 mb={8}>Popular buys</H3>
        <Tabs options={options} defaultValue="stocks" />
      </View>
    </BaseLayout>
  );
}
