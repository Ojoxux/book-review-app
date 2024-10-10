import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("有効なメールアドレスを入力してください。")
    .required("メールアドレスは必須です。"),
  password: Yup.string()
    .min(6, "パスワードは6文字以上である必要があります。")
    .required("パスワードは必須です。"),
});

const Signup = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log("ユーザー登録:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <VStack spacing={4} align="stretch">
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
            <Button type="submit" colorScheme="blue" size="lg" width="100%">
              登録
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
