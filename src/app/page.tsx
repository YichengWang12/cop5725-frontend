import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dashboard from "@/app/components/Dashboard";

export default function Home() {
  return (
      <main>
        <Container>
          <Box>
            <Dashboard/>
          </Box>
        </Container>
      </main>
  );
}
