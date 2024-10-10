import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, VStack, Container } from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

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
            <Routes>
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
