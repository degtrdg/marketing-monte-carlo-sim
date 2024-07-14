import { Box, Text, VStack } from "@chakra-ui/react";

const Chat = ({ chat }) => {
  return (
    <Box textAlign="left" w="100%">
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
  ];

  return (
    <Box w="50%" h="full" p={4} overflowY="scroll">
      <Text mb={4} fontSize="xl" fontWeight="bold" textAlign="center">
        Chat
      </Text>
      <VStack>
        {chats.map((chat, index) => (
          <Chat key={index} chat={chat} />
        ))}
      </VStack>
    </Box>
  );
}
