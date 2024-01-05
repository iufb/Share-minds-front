import { Box, Button, Container, Divider, Space, Stack, Text, Title } from "@mantine/core"
import styles from './page.module.css'
import { Link } from "atomic-router-react"
import { routes } from "src/shared/routing"
export const AccessHubPage = () => {
  return <Container fluid h='100vh' bg={'dark-blue.9'} c={'white'}  >
    <Box className={styles['layout']}>
      <Text ta={'center'} className={styles['logo']} >S</Text>
      <Box>
        <Stack justify="center" >
          <Title className={styles['title']}>Keep your ear to the ground</Title>
          <Text size="xl" >Join us today!</Text>
          <Box maw={300} >
            <Button fullWidth bg={'light-blue.6'} radius='lg' component={Link} to={routes.auth.signup} >Register</Button>
            <Space h='md' />
            <Divider label='Or' labelPosition="center" />
            <Text size="sm">Already have account?</Text>
            <Space h='md' />
            <Button variant="outline" fullWidth radius='lg' component={Link} to={routes.auth.signin}>Login</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  </Container >
}
