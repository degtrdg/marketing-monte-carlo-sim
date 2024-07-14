"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import InfoSection from "./components/info-section";
import PeopleSection from "./components/people-section";
import Sidebar from "./sidebar";

const MainSection = (props) => {
  const [person, setPerson] = useState(null);

  return (
    <HStack spacing={0} {...props}>
      <PeopleSection person={person} setPerson={setPerson} />
      <InfoSection />
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
