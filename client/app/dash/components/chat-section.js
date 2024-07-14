import { Box, Text, VStack } from "@chakra-ui/react";

const Chat = ({ chat }) => {
  return (
    <Box
      textAlign="left"
      w="100%"
      borderBottom="1px"
      borderColor="rgba(0,0,0,0.1)"
      p={2}
    >
      <Text>{chat}</Text>
    </Box>
  );
};

export default function ChatSection() {
  const chats = [
    "Test",
    "Hi",
    "Idk",
    "What's up",
    "Not much",
    "How about you?",
    "Not much",
    "What are you up to?",
    "Just hanging out",
    "Cool",
    "Test",
    "Hi",
    "Idk",
    "What's up",
    "Not much",
    "How about you?",
    "Not much",
    "What are you up to?",
    "Just hanging out",
    "Cool",
    "Test",
    "Hi",
    "Idk",
    "What's up",
    "Not much",
    "How about you?",
    "Not much",
    "What are you up to?",
    "Just hanging out",
    "Cool",
  ];

  return (
    <Box w="50%" h="full" p={4}>
      <Text h="10%" fontSize="xl" fontWeight="bold" textAlign="center">
        Chat
      </Text>
      <VStack
        h="90%"
        border="1px"
        borderRadius="lg"
        borderColor="gray.400"
        overflowY="scroll"
      >
        {chats.map((chat, index) => (
          <Chat key={index} chat={chat} />
        ))}
      </VStack>
    </Box>
  );
}
