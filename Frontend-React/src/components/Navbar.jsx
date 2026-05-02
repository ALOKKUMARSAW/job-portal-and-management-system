import React from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    Container,
  } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
  

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <WorkIcon sx={{ fontSize: 32, mr: 1.5, color: '#fff' }} />
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: '#fff',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              JobForMore
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button 
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.95rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Home
            </Button>
            <Button 
              variant="contained"
              onClick={() => window.location.hash = '#saved-jobs'}
              sx={{
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.95rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.28)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Saved Jobs
            </Button>
            {isAdmin() && (
              <Button 
                variant="contained"
                onClick={() => navigate('/create')}
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#667eea',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    background: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Add Job
              </Button>
            )}
            {user ? (
              <>
                <Typography variant="body2" sx={{ color: '#fff', px: 2 }}>
                  {user.name} ({user.role})
                </Typography>
                <Button 
                  variant="outlined"
                  onClick={logout}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/register')}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Register
                </Button>
              </>
            )}
            <Button 
              variant="outlined"
              href='https://alokkumarsaw.netlify.app/'
              target="_blank"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                  borderColor: '#fff',
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
