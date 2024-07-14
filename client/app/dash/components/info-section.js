"use client";

import { HStack } from "@chakra-ui/react";
import ChatSection from "./chat-section";
import GraphSection from "./graph-section";

export default function InfoSection() {
  return (
    <HStack
      bg="rgba(0, 10, 30, 0.15)"
      borderRadius="lg"
      mr={2}
      border="1px"
      borderColor="rgba(0,0,0,0.3)"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.5)"
      w="70%"
      h="98%"
    >
      <ChatSection />
      <GraphSection />
    </HStack>
  );
}
