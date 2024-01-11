import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CountUp from 'react-countup';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { HomeProjects } from '../components/HomeProjects';
import { VStack, Box, Text, HStack } from '@chakra-ui/react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Box>
          <Box
            gap={10}
            my={2}
            justifyContent={"center"}
            alignItems={["center", "start"]}
            display={"flex"}
            flexDir={["column", "row"]}
          >
            <VStack w={"100px"} gap={0}>
                <Text
                  fontSize={"3xl"}
                  fontWeight={800}
                  m={0}
                >
                  <CountUp
                    end={4500}
                    prefix='+'
                    style={{ marginBottom: 0 }}
                  />
                </Text>

                <Text m={0}>
                  <b>commits</b>
                </Text>
            </VStack>

            <VStack gap={0}>
              <Text fontWeight={800} fontSize={"3xl"} m={0}>
                +4
              </Text>
              <Text m={0}>
                <b>years of<br/> experience</b>
              </Text>
            </VStack>

            <VStack w={"100px"} gap={0}>
                <Text
                  fontSize={"3xl"}
                  fontWeight={800}
                  m={0}
                >
                  <CountUp
                    end={2500}
                    prefix='+'
                    style={{ marginBottom: 0 }}
                  />
                </Text>

                <Text m={0}>
                  <b>cups of <br />coffee</b>
                </Text>
            </VStack>
          </Box>
        </Box>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Home`}
      description="SSr Software Developer | Engineer Manager">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomeProjects />
      </main>
    </Layout>
  );
}
