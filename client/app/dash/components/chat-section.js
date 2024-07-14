import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "../../utils/user-context";

const Chat = ({ chat, salesPitch }) => {
  return (
    <VStack
      textAlign="left"
      w="100%"
      borderBottom="1px"
      borderColor="rgba(0,0,0,0.1)"
      p={2}
      alignItems="flex-start"
      bgGradient={
        chat.level_of_interest > 50
          ? "linear(to-l, green.50, transparent)"
          : "linear(to-l, red.50, transparent)"
      }
    >
      <Text fontSize="xs" fontWeight="bold">
        Sales Pitch:
      </Text>
      <Text fontSize="sm">{salesPitch}</Text>
      <Text fontSize="xs" fontWeight="bold">
        Thoughts:
      </Text>
      <Text fontSize="sm">{chat.thoughts}</Text>
      <Text fontSize="xs" fontWeight="bold">
        Interest Level:
      </Text>
      <Text
        fontWeight="bold"
        fontSize="xl"
        color={chat.level_of_interest > 50 ? "green.600" : "red.600"}
      >
        {Math.max(
          0,
          Math.min(
            100,
            chat.level_of_interest +
              (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 6)
          )
        )}
      </Text>
    </VStack>
  );
};

export default function ChatSection({ person }) {
  const { companyInfo } = useUser();
  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);

  const sales_pitch = [
    "Congrats on raising $500k in your Pre-Seed funding round last year! I'm impressed with how Together AI is solving everyday workplace challenges efficiently.",
    "With such growth, managing finances can become tricky. Are you finding it hard to keep your burn rate under control?",
    "At Hiline, we help over 300 businesses keep their finances in check. We handle daily bookkeeping, monthly reports, and payroll. We even helped Jahnel Group save $1M in taxes.",
    "Is this something you're dealing with? If so, just hit reply and let's chat.",
  ];

  return (
    <Box w="50%" h="full" p={4}>
      <Text h="10%" fontSize="xl" fontWeight="bold" textAlign="center">
        Sales Pitch Analysis
      </Text>
      <VStack
        h="90%"
        border="1px"
        borderRadius="lg"
        borderColor="gray.400"
        overflowY="scroll"
        spacing={0}
      >
        {person &&
          companyInfo?.employee_list[person.name]?.results?.map(
            (chat, index) => (
              <Chat key={index} chat={chat} salesPitch={sales_pitch[index]} />
            )
          )}
      </VStack>
    </Box>
  );
}
