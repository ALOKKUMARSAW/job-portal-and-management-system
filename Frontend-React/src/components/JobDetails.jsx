import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [applyError, setApplyError] = useState('');
  const jobId = location.state?.id;
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/jobPost/${jobId}`);
          setJob(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching job details:', error);
          alert('Error loading job details. Redirecting...');
          navigate('/');
        }
      };
      fetchJob();
    } else {
      navigate('/');
    }
  }, [jobId, navigate]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Job not found</Typography>
      </Container>
    );
  }

  // Parse the job description to extract structured information
  const parseJobDescription = (desc) => {
    if (!desc) return null;
    
    // Try to parse if it's structured JSON-like or use as-is
    try {
      return JSON.parse(desc);
    } catch {
      // If not JSON, check if it contains structured text format
      // For now, return the description as-is
      // In a real scenario, you might want to parse text-based structured data
      return { fullDescription: desc };
    }
  };

  const jobData = parseJobDescription(job.postDesc);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    setApplyError('');
    setApplyMessage('');

    try {
      const response = await axios.post(`http://localhost:8080/jobPost/${jobId}/apply`, null, {
        headers: {
          'X-User-Id': user.id.toString()
        }
      });
      setApplyMessage('Application submitted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setApplyError(error.response?.data?.message || 'Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  // Default structured data for demonstration - this would come from the backend
  const defaultJobData = {
    rolesAndResponsibilities: [
      "Assist in data collection, cleaning, transformation, and analysis for machine learning projects.",
      "Write clean, efficient Python code for data preparation, ETL processes, and feature engineering.",
      "Support the development of basic ML models under guidance starting with regression, classification, and clustering.",
      "Create dashboards, reports, or simple visualizations for data insights.",
      "Document workflows, processes, and learnings to build strong technical and analytical practices.",
      "Learn and apply cloud concepts (AWS/GCP/Azure basics) and SQL best practices over time."
    ],
    qualification: "Any",
    specialization: "Any",
    yearOfPassingUG: "2023, 2024",
    yearOfPassingPG: "2023, 2024",
    technology: "Python, SQL, relational databases, logical thinking, analytical thinking, communication skills",
    workMode: "Office",
    probationPeriod: "3 Months",
    jobLocation: "Bangalore North, India",
    interviewLocation: "Virtual",
    interviewDate: "14 Nov 2025",
    interviewRounds: [
      "Round 1: Written Test(Virtual)",
      "Round 2: Online Test(Virtual)",
      "Round 3: HR Screening Telecom (Virtual)",
      "Round 4: Technical Round - 1(Virtual)",
      "Round 5: Technical Round - 2(Virtual)",
      "Round 6: Technical Round - 3(Virtual)"
    ],
    salaryDetails: "3.6 LPA\nInternship stipend: ₹15,000-20,000 per month\nPost-conversion (Full-time): ₹3.6 LPA (Performance based)",
    qualificationPercentages: {
      "10th": "70%",
      "12th": "70%",
      "UG": "70%",
      "PG": "70%"
    },
    qualificationCGPA: {
      "UG": "7 CGPA",
      "PG": "7 CGPA"
    },
    genderPreference: "None",
    bondDetails: "0 Months",
    backlog: "NOT ALLOWED"
  };

  // Merge default data with parsed data, prioritizing parsed data
  const displayData = jobData && Object.keys(jobData).length > 1 
    ? { ...defaultJobData, ...jobData } 
    : defaultJobData;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{
          mb: 3,
          color: '#667eea',
          '&:hover': {
            background: 'rgba(102, 126, 234, 0.1)',
          },
        }}
      >
        Back to Jobs
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WorkOutlineIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              {job.companyName && (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#667eea',
                    mb: 0.5,
                  }}
                >
                  {job.companyName}
                </Typography>
              )}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 0.5,
                }}
              >
                {job.postProfile || 'Job Title'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Job ID: {job.postId}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Roles & Responsibilities */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <DescriptionIcon sx={{ color: '#667eea', fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              Roles & Responsibility
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}
          >
            {displayData.rolesAndResponsibilities ? (
              <List>
                {displayData.rolesAndResponsibilities.map((responsibility, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#667eea', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={responsibility}
                      primaryTypographyProps={{
                        sx: { fontSize: '0.95rem', color: '#333' },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {jobData?.fullDescription || job.postDesc || 'No description available.'}
              </Typography>
            )}
          </Paper>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Key Information Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <SchoolIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Qualification
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                  {displayData.qualification}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Specialization: {displayData.specialization}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CalendarTodayIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Year of Passing
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                  UG: {displayData.yearOfPassingUG}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  PG: {displayData.yearOfPassingPG}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CodeIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Technology
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.postTechStack && job.postTechStack.length > 0 ? (
                    job.postTechStack.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#fff',
                          fontWeight: 500,
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {displayData.technology}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <BusinessIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Work Mode
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {displayData.workMode}
                </Typography>
                {displayData.probationPeriod && (
                  <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                    Probation Period: {displayData.probationPeriod}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <LocationOnIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Job Location
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {displayData.jobLocation}
                </Typography>
                {displayData.interviewLocation && (
                  <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                    Interview Location: {displayData.interviewLocation}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <AttachMoneyIcon sx={{ color: '#667eea', fontSize: 28, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                  Salary Details
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', whiteSpace: 'pre-line' }}>
                  {displayData.salaryDetails}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Interview Rounds */}
        {displayData.interviewRounds && displayData.interviewRounds.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 2,
                }}
              >
                Interview Rounds
              </Typography>
              <List>
                {displayData.interviewRounds.map((round, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: 2,
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={round}
                      primaryTypographyProps={{
                        sx: { fontWeight: 600, color: '#1a1a1a' },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              {displayData.interviewDate && (
                <Typography variant="body2" sx={{ color: '#666', mt: 2, ml: 2 }}>
                  Interview Date: {displayData.interviewDate}
                </Typography>
              )}
            </Box>
          </>
        )}

        {/* Qualification Requirements */}
        {displayData.qualificationPercentages && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 2,
                }}
              >
                Qualification %
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {Object.entries(displayData.qualificationPercentages).map(([key, value]) => (
                  <Grid item xs={6} sm={4} md={3} key={key}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        {key}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                        {value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {displayData.qualificationCGPA && (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 2,
                    }}
                  >
                    Qualification (CGPA)
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(displayData.qualificationCGPA).map(([key, value]) => (
                      <Grid item xs={6} sm={4} md={3} key={key}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            background: 'rgba(102, 126, 234, 0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(102, 126, 234, 0.2)',
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                            {key}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                            {value}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          </>
        )}

        {/* Additional Information */}
        {(displayData.genderPreference || displayData.bondDetails || displayData.backlog) && (
          <>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
              {displayData.genderPreference && (
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Gender Preference
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {displayData.genderPreference}
                  </Typography>
                </Grid>
              )}
              {displayData.bondDetails && (
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Bond Details
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {displayData.bondDetails}
                  </Typography>
                </Grid>
              )}
              {displayData.backlog && (
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    Backlog
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {displayData.backlog}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {/* Experience Requirement */}
        {job.reqExperience !== undefined && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccessTimeIcon sx={{ color: '#667eea', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  Required Experience
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {job.reqExperience} {job.reqExperience === 1 ? 'year' : 'years'}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Posting Date */}
        {job.postingDate && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarTodayIcon sx={{ color: '#667eea', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                  Posted On
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {new Date(job.postingDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Apply Button - Only for logged-in users (not admins) */}
        {user && !isAdmin() && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {applyMessage && (
                <Alert severity="success">{applyMessage}</Alert>
              )}
              {applyError && (
                <Alert severity="error">{applyError}</Alert>
              )}
              <Button
                variant="contained"
                size="large"
                onClick={handleApply}
                disabled={applying}
                startIcon={applying ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {applying ? 'Applying...' : 'Apply for this Job'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default JobDetails;

