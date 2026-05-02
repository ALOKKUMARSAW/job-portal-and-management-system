import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
    Typography,
    Container,
    IconButton,
    Chip,
    Paper,
    Button,
  } from "@mui/material";
  import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    const [query, setQuery] = useState("");
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState(() => {
      const saved = localStorage.getItem('savedJobs');
      return saved ? JSON.parse(saved) : [];
    });
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
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
      const fetchInitialPosts = async () => {
        const response = await axios.get(`http://localhost:8080/jobPosts`);
        setJobs(response.data);
      };
      fetchInitialPosts();
    }, []);

    useEffect(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = jobs.filter((job) => {
        const description = String(job.postDesc || job.postProfile || "").toLowerCase();
        const techStack = Array.isArray(job.postTechStack) ? job.postTechStack.join(' ').toLowerCase() : '';
        const location = String(job.jobLocation || '').toLowerCase();
        const company = String(job.companyName || '').toLowerCase();

        const matchesQuery =
          lowerQuery.length === 0 ||
          company.includes(lowerQuery) ||
          description.includes(lowerQuery) ||
          techStack.includes(lowerQuery) ||
          location.includes(lowerQuery);

        const matchesCompany = selectedCompany ? company === selectedCompany.toLowerCase() : true;
        const matchesLocation = selectedLocation ? location === selectedLocation.toLowerCase() : true;
        const matchesCategory = selectedCategory ? techStack.includes(selectedCategory.toLowerCase()) : true;

        return matchesQuery && matchesCompany && matchesLocation && matchesCategory;
      });
      setFilteredJobs(filtered);
    }, [jobs, query, selectedCompany, selectedLocation, selectedCategory]);

    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this job posting?')) {
        try {
          await axios.delete(`http://localhost:8080/jobPost/${id}`);
          setJobs((prev) => prev.filter((item) => item.postId !== id));
        } catch (error) {
          console.error(error);
          alert('Failed to delete the job posting. Please try again.');
        }
      }
    }

    const parseStructuredDesc = useCallback((job) => {
      if (!job?.postDesc) return {};
      try {
        return JSON.parse(job.postDesc);
      } catch {
        return {};
      }
    }, []);

    const extractJobLocation = useCallback((job) => {
      const parsed = parseStructuredDesc(job);
      return job.jobLocation || parsed.jobLocation || '';
    }, [parseStructuredDesc]);

    const extractSalary = (job) => {
      const parsed = parseStructuredDesc(job);
      return parsed.salaryDetails ? parsed.salaryDetails.split('\n')[0] : '';
    };

    const topCompanies = useMemo(() => {
      const counts = jobs.reduce((acc, job) => {
        const company = String(job.companyName || 'Unknown').trim();
        if (!company) return acc;
        acc[company] = (acc[company] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([company]) => company);
    }, [jobs]);

    const topLocations = useMemo(() => {
      const counts = jobs.reduce((acc, job) => {
        const location = extractJobLocation(job).trim() || 'Remote';
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([location]) => location);
    }, [jobs, extractJobLocation]);

    const topCategories = useMemo(() => {
      const counts = jobs.reduce((acc, job) => {
        const techStack = Array.isArray(job.postTechStack)
          ? job.postTechStack
          : String(parseStructuredDesc(job).technology || '').split(',').map((item) => item.trim()).filter(Boolean);
        techStack.forEach((tag) => {
          if (!tag) return;
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([tag]) => tag);
    }, [jobs, parseStructuredDesc]);

    const featuredJobs = useMemo(() => {
      return jobs
        .filter((job) => job.registrationStatus === 'Reg. Open')
        .sort((a, b) => new Date(b.postingDate || 0) - new Date(a.postingDate || 0))
        .slice(0, 3);
    }, [jobs]);

    const savedJobs = useMemo(() => {
      return jobs.filter((job) => savedJobIds.includes(job.postId));
    }, [jobs, savedJobIds]);

    const isSaved = (id) => savedJobIds.includes(id);

    const toggleSaveJob = (id) => {
      setSavedJobIds((prev) => {
        const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
        localStorage.setItem('savedJobs', JSON.stringify(next));
        return next;
      });
    };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 4,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.08))',
          borderRadius: 4,
          border: '1px solid rgba(102, 126, 234, 0.15)',
          boxShadow: '0 16px 50px rgba(102, 126, 234, 0.08)',
          animation: 'fadeIn 0.6s ease-out',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#1e2549' }}>
              Discover the latest openings, remote roles, and internship drives.
            </Typography>
            <Typography variant="body1" sx={{ color: '#444971', mb: 3, maxWidth: 620, lineHeight: 1.7 }}>
              JobForMore gathers high-growth job postings, filtered company drives, and real application status updates for fresher-friendly roles.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setQuery('')}
                sx={{ textTransform: 'none', py: 1.5, px: 3, borderRadius: 3 }}
              >
                Browse All Jobs
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setQuery('');
                  setSelectedCompany('');
                  setSelectedLocation('');
                  setSelectedCategory('');
                }}
                sx={{ textTransform: 'none', py: 1.5, px: 3, borderRadius: 3 }}
              >
                Reset Filters
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: '#fff',
                borderRadius: 4,
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="subtitle2" sx={{ color: '#667eea', mb: 2, fontWeight: 700 }}>
                Fresh Jobs Update
              </Typography>
              <Typography variant="h5" sx={{ mb: 1.5, color: '#1a1a1a', fontWeight: 700 }}>
                {jobs.length} open roles today
              </Typography>
              <Typography variant="body2" sx={{ color: '#5f6472', mb: 3 }}>
                Explore the hottest job opportunities across content, engineering, sales, and technology.
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, borderRadius: 3, textAlign: 'center', background: '#f4f6ff' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {featuredJobs.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5f6472' }}>
                      Featured
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, borderRadius: 3, textAlign: 'center', background: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {savedJobs.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5f6472' }}>
                      Saved
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, borderRadius: 3, textAlign: 'center', background: '#eef7f3' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {topLocations.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5f6472' }}>
                      Locations
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {savedJobs.length > 0 && (
        <Box id="saved-jobs" sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}>
            Saved Jobs
          </Typography>
          <Grid container spacing={3}>
            {savedJobs.slice(0, 3).map((job) => {
              const location = extractJobLocation(job);
              const salary = extractSalary(job);
              return (
                <Grid item xs={12} md={4} key={job.postId}>
                  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(102, 126, 234, 0.12)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#667eea', mb: 1, fontWeight: 700 }}>
                      Saved Role
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {job.postProfile}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#5f6472', mb: 1 }}>
                      {job.companyName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4a4a4a', mb: 1 }}>
                      {location || 'Remote'} • {salary || 'Salary not specified'}
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => navigate('/job-details', { state: { id: job.postId } })}
                      sx={{ textTransform: 'none', color: '#667eea' }}
                    >
                      View details
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          background: '#fff',
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}>
          Filter by what matters most
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
          {topCompanies.map((company) => (
            <Chip
              key={company}
              label={company}
              clickable
              color={selectedCompany === company ? 'primary' : 'default'}
              onClick={() => setSelectedCompany(selectedCompany === company ? '' : company)}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
          {topLocations.map((location) => (
            <Chip
              key={location}
              label={location}
              clickable
              color={selectedLocation === location ? 'primary' : 'default'}
              onClick={() => setSelectedLocation(selectedLocation === location ? '' : location)}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {topCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
            />
          ))}
        </Box>
      </Paper>

      {filteredJobs.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
            No jobs found.
          </Typography>
          <Typography variant="body2" sx={{ color: '#5f6472', mt: 1 }}>
            Try clearing filters or refining your search.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((p, index) => {
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

            // Calculate 24-hour countdown timer and check if registration should close
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

            // Check if registration deadline has passed and update status
            const checkAndUpdateRegistrationStatus = (deadline, currentStatus) => {
              if (!deadline) return currentStatus;
              try {
                const deadlineDate = new Date(deadline);
                const now = new Date();
                
                // If deadline has passed and status is still "Reg. Open", close it
                if (now >= deadlineDate && currentStatus === 'Reg. Open') {
                  return 'Reg. Closed';
                }
                return currentStatus;
              } catch (e) {
                return currentStatus;
              }
            };

            const countdown = getCountdown(registrationDeadline);
            const updatedRegistrationStatus = checkAndUpdateRegistrationStatus(registrationDeadline, registrationStatus);

            // Get status badge color
            const getStatusColor = (status) => {
              if (status === 'Reg. Open') return { bg: '#e8f5e9', color: '#2e7d32', dot: '#4caf50' };
              if (status === 'Reg. Closed') return { bg: '#fff3e0', color: '#e65100', dot: '#ff9800' };
              if (status === 'In Progress') return { bg: '#e3f2fd', color: '#1565c0', dot: '#2196f3' };
              return { bg: '#e8f5e9', color: '#2e7d32', dot: '#4caf50' };
            };

            const statusColors = getStatusColor(updatedRegistrationStatus);

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
                        label={updatedRegistrationStatus}
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
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
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
                      <Button
                        variant={isSaved(p.postId) ? 'contained' : 'outlined'}
                        onClick={() => toggleSaveJob(p.postId)}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          color: isSaved(p.postId) ? '#fff' : '#1976d2',
                          borderColor: isSaved(p.postId) ? 'transparent' : '#1976d2',
                          backgroundColor: isSaved(p.postId) ? '#1976d2' : 'transparent',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          minWidth: 94,
                          px: 1.5,
                          py: 0.75,
                          '&:hover': {
                            backgroundColor: isSaved(p.postId) ? '#155fa0' : 'rgba(25, 118, 210, 0.08)',
                            borderColor: isSaved(p.postId) ? 'transparent' : '#1976d2',
                          },
                        }}
                      >
                        {isSaved(p.postId) ? 'Saved' : 'Save'}
                      </Button>
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
                  {countdown && updatedRegistrationStatus === 'Reg. Open' && (
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
      )}
    </Container>
  )
}

export default AllPosts