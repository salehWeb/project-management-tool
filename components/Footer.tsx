import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
    <Paper className="mt-['calc(10%+60px)'] min-w-full fixed bottom-0" component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box className="flex justify-center items-center pt-2 gap-2 grow flex-row mb-2">

          <Image priority src="/images/logo.svg" width={30} height={30} alt="Logo" />

          <Typography variant="caption" color="initial"> Copyright ©{new Date().getFullYear()}. Anti Bugs TM </Typography>

        </Box>
      </Container>
    </Paper>
  )
}

export default Footer