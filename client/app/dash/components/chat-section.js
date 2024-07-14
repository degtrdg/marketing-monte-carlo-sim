import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "../../utils/user-context";

const Chat = ({ chat }) => {
  return (
    <Box
      textAlign="left"
      w="100%"
      borderBottom="1px"
      borderColor="rgba(0,0,0,0.1)"
      p={2}
    >
      <Text>Thoughts: {chat.thoughts}</Text>
      <Text>Interest: {chat.level_of_interest}</Text>
    </Box>
  );
};

export default function ChatSection({ person }) {
  const { companyInfo } = useUser();
  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);

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
        {person &&
          companyInfo?.employee_list[person.name]?.results?.map(
            (chat, index) => <Chat key={index} chat={chat} />
          )}
      </VStack>
    </Box>
  );
}
