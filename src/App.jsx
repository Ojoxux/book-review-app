import "./App.css";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="xl" centerContent>
        <Box width="100%" maxWidth="400px" m={4}>
          <VStack
            spacing={8}
            align="stretch"
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
          >
            <Heading as="h1" size="xl" textAlign="center">
              ログイン
            </Heading>
            <LoginForm />
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
