"use client";

import { Box, HStack } from "@chakra-ui/react";
import GraphSection from "./components/graph-section";
import SimulationSection from "./components/simulation-section";
import Sidebar from "./sidebar";

const MainSection = (props) => {
  return (
    <HStack spacing={0} {...props}>
      <SimulationSection />
      <GraphSection />
    </HStack>
  );
};

export default function Dashboard() {
  return (
    <Box h="100vh" w="100vw" display="flex">
      <Sidebar w="20vw" h="full" />
      <MainSection w="80vw" h="full" />
    </Box>
  );
}
