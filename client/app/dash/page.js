import { Box } from "@chakra-ui/react";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <Box h="100vh" w="100vw">
      <Sidebar w="20%" h="full" />
    </Box>
  );
}
