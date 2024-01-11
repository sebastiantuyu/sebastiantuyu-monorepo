import { Box, Card, CardBody, Text, HStack, Heading, SimpleGrid, Badge } from "@chakra-ui/react";


const projects = [
  {
    title: "Content Delivery Network",
    description: "I've implemented an automated Content Delivery Network (CDN) from scratch, leveraging Pulumi for seamless automations and Oracle EKS (Kubernetes Cluster) for orchestration.",
    milestones: [],
    tags: ["aws", "infrastrcture", "global"]
  },
  {
    title: "Pipelines",
    description: "Pipelines is a DevOps platform designed to swiftly deliver high-performance websites. It features a range of plugins for error tracking, automated deployments, and lightweight analytics.",
    milestones: [],
    tags: ["ui/ux", "infrastrcture", "aws", "cloud"]
  },
  {
    title: "JavaScraft",
    description: "I've crafted a simplified Minecraft version using TypeScript and Three.js. It dynamically initiates servers on demand, facilitating multiplayer online play within compact rooms.",
    milestones: [],
    tags: ["typescript", "express", "vuejs", "poo"]
  },
  {
    title: "Seqloud",
    description: "Enhanced diagrams for architecting cloud services it allows users to drag and drop pre-configured blocks with most common services of the major cloud providers",
    milestones: [],
    tags: ["ui/ux", "diagrams", "react"]
  }
]

export const HomeProjects = () => {
  return (
    <Box
      py={10}
      bgColor={"gray.100"}
    >
      <Heading
        as={"h3"}
        textAlign={"center"}
      >
        Key Projects
      </Heading>
      <Text
        align={"center"}
        px={5}
        opacity={0.6}
      >
        Found here my most recent projects that I've been working on : )
      </Text>
      <Box margin={"auto"} maxW={["90%", "60%"]} my={10}>
        <SimpleGrid
          gridAutoRows={"1fr"}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          alignItems={"center"}
          justifyItems={"center"}
          justify={"center"}
          gap={5}
        >
          {
            projects.map((v,k) => (
              <Card key={k} maxW={350}>
                <CardBody>
                <Heading as={"h3"} fontSize={"xl"}>
                  {v.title}
                </Heading>

                <Text>
                  {v.description}
                </Text>
                <HStack>
                  {
                    v.tags.map((q,qK) => (
                      <Badge key={qK}>{q}</Badge>
                    ))
                  }
                </HStack>
                {/* <OrderedList>
                  {
                    v.milestones.map((q,qK) => (
                      <ListItem key={qK}>
                        {q}
                      </ListItem>
                    ))
                  }
                </OrderedList> */}
                </CardBody>
              </Card>
            ))
          }
        </SimpleGrid>
      </Box>
    </Box>
  )
}