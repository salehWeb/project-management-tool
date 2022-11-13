import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
        <Paper sx={{marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                my:1
              }}
            >
                <div>
                <Image priority src="/images/logo.svg" width={30} height={30} alt="Logo" />
                </div>
            </Box>
    
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                mb: 2,
              }}
            >
              <Typography variant="caption" color="initial">
                Copyright ©{new Date().getFullYear()}. [Anti Bugs] 
              </Typography>
            </Box>
          </Container>
        </Paper>
  )
}

export default Footer