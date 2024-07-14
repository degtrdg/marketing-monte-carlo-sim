"use client";

import { HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ChatSection from "./chat-section";
import GraphSection from "./graph-section";

export default function InfoSection({ person }) {
  return (
    <HStack
      as={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      bg="rgba(0, 10, 30, 0.15)"
      borderRadius="lg"
      mr={2}
      border="1px"
      borderColor="rgba(0,0,0,0.3)"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.5)"
      w="70%"
      h="98%"
    >
      <ChatSection person={person} />
      <GraphSection person={person} />
    </HStack>
  );
}
