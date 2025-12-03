import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../context/AuthContext';

import {
  Box,
    Card,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    Container,
    IconButton,
    Chip,
    Paper,
    Button,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    const [query, setQuery] = useState("");
    const [post, setPost] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    // Update time every second for countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer);
    }, []);

const handleEdit = (id) => {
  navigate("/edit",{state:{id}});
}

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:8080/jobPosts/keyword/${query}`);    
        setPost(response.data);
      };
        const fetchInitialPosts = async () => {
            const response = await axios.get(`http://localhost:8080/jobPosts`);
            setPost(response.data);
        }
         fetchInitialPosts();
         if (query.length === 0) fetchInitialPosts();
         if (query.length > 2) fetchPosts();
      }, [query]);

      const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
          async function deletePost() {
            await axios.delete(`http://localhost:8080/jobPost/${id}`);
          }
          deletePost();
          window.location.reload();
        }
      }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, animation: 'fadeIn 0.6s ease-out' }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search jobs by keyword, skills, or description..."
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: '1rem',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          />
        </Paper>
      </Box>

      {post && post.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
            No jobs found. Try a different search term.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {post &&
          post.map((p, index) => {
            // Parse job data for location and salary
            let jobLocation = '';
            let salary = '';
            let registrationStatus = p.registrationStatus || 'Reg. Open';
            let applicationStatus = p.applicationStatus || 'Eligible to Apply';
            let registrationDeadline = p.registrationDeadline || '';
            
            try {
              const parsed = JSON.parse(p.postDesc);
              jobLocation = parsed.jobLocation || '';
              salary = parsed.salaryDetails ? parsed.salaryDetails.split('\n')[0] : '';
            } catch (e) {
              // If not JSON, keep defaults
            }

            // Calculate 24-hour countdown timer
            const getCountdown = (deadline) => {
              if (!deadline) return null;
              try {
                const deadlineDate = new Date(deadline);
                const diff = deadlineDate - currentTime;
                
                if (diff <= 0) return null;
                
                const totalHours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                // Display in HH:MM:SS format for 24-hour countdown
                return `${String(totalHours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
              } catch (e) {
                return null;
              }
            };

            const countdown = getCountdown(registrationDeadline);

            // Get status badge color
            const getStatusColor = (status) => {
              if (status === 'Reg. Open') return { bg: '#e8f5e9', color: '#2e7d32', dot: '#4caf50' };
              if (status === 'Reg. Closed') return { bg: '#fff3e0', color: '#e65100', dot: '#ff9800' };
              if (status === 'In Progress') return { bg: '#e3f2fd', color: '#1565c0', dot: '#2196f3' };
              return { bg: '#e8f5e9', color: '#2e7d32', dot: '#4caf50' };
            };

            const statusColors = getStatusColor(registrationStatus);

            // Get application status icon and text
            const getApplicationStatus = (status) => {
              if (status === 'Eligible to Apply') {
                return { icon: <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />, text: 'Eligible to Apply', color: '#4caf50' };
              }
              if (status === 'Not Eligible') {
                return { icon: <CancelIcon sx={{ fontSize: 16, color: '#f44336' }} />, text: 'Not Eligible', color: '#f44336' };
              }
              if (status === 'Application Submitted') {
                return { icon: <DescriptionIcon sx={{ fontSize: 16, color: '#2196f3' }} />, text: 'Application Submitted', color: '#2196f3' };
              }
              if (status === 'Not Shortlisted') {
                return { icon: <CancelIcon sx={{ fontSize: 16, color: '#f44336' }} />, text: 'Not Shortlisted', color: '#f44336' };
              }
              return { icon: <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />, text: 'Eligible to Apply', color: '#4caf50' };
            };

            const appStatus = getApplicationStatus(applicationStatus);

            // Get company initials for logo
            const getCompanyInitials = (name, logoText) => {
              // If companyLogoText is provided, use it
              if (logoText && logoText.trim() !== '') {
                return logoText.trim().toUpperCase();
              }
              
              // Otherwise, auto-detect from company name
              if (!name) return 'JD';
              
              // Check if first word is an acronym (all caps, 2-4 letters)
              const words = name.split(' ');
              const firstWord = words[0];
              
              // If first word is all caps and 2-4 characters, use it (e.g., "MRI", "IBM", "HP")
              if (firstWord === firstWord.toUpperCase() && firstWord.length >= 2 && firstWord.length <= 4 && /^[A-Z]+$/.test(firstWord)) {
                return firstWord;
              }
              
              // If first word is short (3-4 chars), use it (e.g., "Meta", "Apple")
              if (firstWord.length >= 3 && firstWord.length <= 4) {
                return firstWord.toUpperCase();
              }
              
              // Otherwise, use first letter of first two words
              if (words.length >= 2) {
                return (words[0][0] + words[1][0]).toUpperCase();
              }
              
              // Fallback: first 2-3 characters
              return name.substring(0, Math.min(3, name.length)).toUpperCase();
            };

            return (
              <Grid key={p.id || index} item xs={12} sm={6} md={6} lg={4}>
                <Card 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {/* Header with Logo, Company Name, and Status */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                      {/* Company Logo */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          background: '#1976d2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          flexShrink: 0,
                        }}
                      >
                        {getCompanyInitials(p.companyName, p.companyLogoText)}
                      </Box>
                      
                      {/* Company Name and Job Title */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {p.companyName && (
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              color: '#1a1a1a',
                              mb: 0.5,
                              lineHeight: 1.2,
                            }}
                          >
                            {p.companyName}
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: '#666',
                            lineHeight: 1.2,
                          }}
                        >
                          {p.postProfile}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Status Badge and Action Icons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <Chip
                        label={registrationStatus}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.7rem',
                          backgroundColor: statusColors.bg,
                          color: statusColors.color,
                          fontWeight: 500,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                        icon={
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: statusColors.dot,
                            }}
                          />
                        }
                      />
                      {isAdmin() && (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            onClick={() => handleEdit(p.postId)}
                            size="small"
                            sx={{
                              width: 28,
                              height: 28,
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(p.postId)}
                            size="small"
                            sx={{
                              width: 28,
                              height: 28,
                              color: '#d32f2f',
                              '&:hover': {
                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                              },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Skills */}
                  {p.postTechStack && p.postTechStack.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {p.postTechStack.slice(0, 3).map((s, i) => (
                          <Chip
                            key={i}
                            label={s}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              backgroundColor: '#f5f5f5',
                              color: '#424242',
                              fontWeight: 400,
                              border: 'none',
                            }}
                          />
                        ))}
                        {p.postTechStack.length > 3 && (
                          <Chip
                            label={`+${p.postTechStack.length - 3} >`}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              backgroundColor: '#f5f5f5',
                              color: '#424242',
                              fontWeight: 400,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* Location */}
                  {jobLocation && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                      <LocationOnIcon sx={{ color: '#757575', fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#757575',
                          fontSize: '0.875rem',
                        }}
                      >
                        {jobLocation.length > 25 ? jobLocation.substring(0, 25) + '...' : jobLocation}
                      </Typography>
                    </Box>
                  )}

                  {/* Countdown Timer */}
                  {countdown && registrationStatus === 'Reg. Open' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                      <AccessTimeIcon sx={{ color: '#757575', fontSize: 16 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#757575',
                          fontSize: '0.875rem',
                          fontFamily: 'monospace',
                          fontWeight: 500,
                        }}
                      >
                        {countdown}
                      </Typography>
                    </Box>
                  )}

                  {/* Application Status */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                    {appStatus.icon}
                    <Typography
                      variant="body2"
                      sx={{
                        color: appStatus.color,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                      }}
                    >
                      {appStatus.text}
                    </Typography>
                  </Box>

                  {/* Bottom Section: Salary and Button */}
                  <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: '1px solid #e0e0e0' }}>
                    {/* Salary */}
                    {salary && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AttachMoneyIcon sx={{ color: '#1a1a1a', fontSize: 20 }} />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: '#1a1a1a',
                            fontSize: '0.95rem',
                          }}
                        >
                          {salary}
                        </Typography>
                      </Box>
                    )}

                    {/* Check Details Button */}
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/job-details', { state: { id: p.postId } })}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        ml: 'auto',
                        borderColor: '#9e9e9e',
                        color: '#424242',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        px: 2,
                        py: 0.75,
                        borderRadius: 1,
                        '&:hover': {
                          borderColor: '#616161',
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      Check Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  )
}

export default AllPosts