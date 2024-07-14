"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import GraphSection from "./components/graph-section";
import SimulationSection from "./components/simulation-section";
import Sidebar from "./sidebar";

const MainSection = (props) => {
  const [person, setPerson] = useState(null);

  return (
    <HStack spacing={0} {...props}>
      <SimulationSection person={person} setPerson={setPerson} />
      <Box w="30%" h="full"></Box>
      <GraphSection person={person} />
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
