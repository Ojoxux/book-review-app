import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('ユーザ名は必須です。'),
  email: Yup.string()
    .email('有効なメールアドレスを入力してください。')
    .required('メールアドレスは必須です。'),
  password: Yup.string()
    .min(6, 'パスワードは6文字以上である必要があります。')
    .required('パスワードは必須です。'),
});

const SignupForm = () => {
  const toast = useToast();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          console.log('リサイズされた画像:', result);
          // ここでリサイズされた画像をどのように処理するかを追加
        },
        error(err) {
          console.error('画像圧縮エラー:', err.message);
        },
      });
    }
  };

  const handleSignup = async (values) => {
    try {
      const response = await fetch(
        'https://railway.bookreview.techtrain.dev/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error('ユーザー登録に失敗しました。');
      }

      const data = await response.json();
      console.log('登録成功:', data);
      toast({
        title: 'アカウント作成成功',
        description: 'ユーザー登録が完了しました！',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('エラー:', error);
      toast({
        title: 'エラー',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({ errors, touched }) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">ユーザ名</FormLabel>
              <Field as={Input} id="name" name="name" type="text" />
              {errors.name && touched.name ? (
                <Text color="red.500">{errors.name}</Text>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.email && touched.email}>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              {errors.email && touched.email ? (
                <Text color="red.500">{errors.email}</Text>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.password && touched.password}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Field as={Input} id="password" name="password" type="password" />
              {errors.password && touched.password ? (
                <Text color="red.500">{errors.password}</Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="avatar">アバター</FormLabel>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" width="100%">
              登録
            </Button>
            <Text>
              すでにアカウントをお持ちですか？{' '}
              <Link
                to="/login"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                ログイン
              </Link>
            </Text>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
