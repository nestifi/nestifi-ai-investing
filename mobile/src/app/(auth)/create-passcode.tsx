import { useState } from 'react';

import { Button } from '@/components/button';
import { NumpadCodeInput } from '@/components/form/numpad-code-input';
import { BackButton } from '@/components/layout/back-button';
import { BaseLayout } from '@/components/layout/base-layout';
import { Paragraph } from '@/components/paragraph';
import { useAuthActions } from '@/store/auth';

export default function PasscodePage() {
  const [code, setCode] = useState<string[]>([]);
  const { login } = useAuthActions();

  return (
    <BaseLayout minH="100%">
      <BackButton title="Create passcode" />
      <Paragraph>This is a 6-digit passcode needed to protect your personal details.</Paragraph>
      <NumpadCodeInput onChange={setCode} />
      <Button variant="primary" onPress={login} mb="$6" disabled={code.length !== 6}>
        Confirm
      </Button>
    </BaseLayout>
  );
}
