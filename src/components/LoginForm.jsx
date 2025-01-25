import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
    } else if (!isValidEmail(email)) {
      setError('有効なメールアドレスを入力してください。');
    } else {
      setError('');
      console.log('ログイン試行:', email, password);
      toast({
        title: 'ログイン成功',
        description: 'ようこそ！',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
            data-testid="email-input"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              data-testid="password-input"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                {showPassword ? '隠す' : '表示'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="100%"
          data-testid="login-button"
        >
          ログイン
        </Button>
        <Text>
          アカウントをお持ちでないですか？{' '}
          <Link
            to="/signup"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            ログイン
          </Link>
        </Text>
      </VStack>
    </form>
  );
};

export default LoginForm;
