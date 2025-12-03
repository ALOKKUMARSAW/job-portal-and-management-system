import React, { useEffect, useState } from "react";
import {
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  companyName: "",
  companyLogoText: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
  postingDate: new Date().toISOString().split('T')[0],
  registrationStatus: "Reg. Open",
  registrationDeadline: "",
  applicationStatus: "Eligible to Apply",
  // Additional fields
  rolesAndResponsibilities: [""],
  qualification: "Any",
  specialization: "Any",
  yearOfPassingUG: "2023, 2024",
  yearOfPassingPG: "2023, 2024",
  workMode: "Office",
  probationPeriod: "",
  jobLocation: "",
  interviewLocation: "",
  interviewDate: "",
  interviewRounds: [""],
  salaryDetails: "",
  qualificationPercent10th: "",
  qualificationPercent12th: "",
  qualificationPercentUG: "",
  qualificationPercentPG: "",
  qualificationCGPAUG: "",
  qualificationCGPAPG: "",
  genderPreference: "None",
  bondDetails: "",
  backlog: "NOT ALLOWED"
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state?.id);

  useEffect(() => {
    if (currId) {
      const fetchInitialPosts = async (id) => {  
        try {
          const response = await axios.get(`http://localhost:8080/jobPost/${id}`);
          console.log(response.data);
          const jobData = response.data;
          
          // Parse the structured JSON from postDesc if it exists
          let parsedData = {};
          if (jobData.postDesc) {
            try {
              parsedData = JSON.parse(jobData.postDesc);
            } catch (e) {
              // If not JSON, keep as is
              parsedData = { fullDescription: jobData.postDesc };
            }
          }
          
          // Merge the data
          setForm({
            ...jobData,
            registrationStatus: jobData.registrationStatus || "Reg. Open",
            registrationDeadline: jobData.registrationDeadline || "",
            applicationStatus: jobData.applicationStatus || "Eligible to Apply",
            rolesAndResponsibilities: parsedData.rolesAndResponsibilities || [""],
            qualification: parsedData.qualification || "Any",
            specialization: parsedData.specialization || "Any",
            yearOfPassingUG: parsedData.yearOfPassingUG || "2023, 2024",
            yearOfPassingPG: parsedData.yearOfPassingPG || "2023, 2024",
            workMode: parsedData.workMode || "Office",
            probationPeriod: parsedData.probationPeriod || "",
            jobLocation: parsedData.jobLocation || "",
            interviewLocation: parsedData.interviewLocation || "",
            interviewDate: parsedData.interviewDate || "",
            interviewRounds: parsedData.interviewRounds || [""],
            salaryDetails: parsedData.salaryDetails || "",
            qualificationPercent10th: parsedData.qualificationPercentages?.["10th"] || "",
            qualificationPercent12th: parsedData.qualificationPercentages?.["12th"] || "",
            qualificationPercentUG: parsedData.qualificationPercentages?.["UG"] || "",
            qualificationPercentPG: parsedData.qualificationPercentages?.["PG"] || "",
            qualificationCGPAUG: parsedData.qualificationCGPA?.["UG"] || "",
            qualificationCGPAPG: parsedData.qualificationCGPA?.["PG"] || "",
            genderPreference: parsedData.genderPreference || "None",
            bondDetails: parsedData.bondDetails || "",
            backlog: parsedData.backlog || "NOT ALLOWED"
          });
        } catch (error) {
          console.error('Error fetching job post:', error);
          alert('Error loading job post. Redirecting to home...');
          navigate('/');
        }
      };
      fetchInitialPosts(currId);
    }
  }, [currId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build structured job description JSON
    const structuredDesc = {
      rolesAndResponsibilities: form.rolesAndResponsibilities.filter(r => r.trim() !== ""),
      qualification: form.qualification,
      specialization: form.specialization,
      yearOfPassingUG: form.yearOfPassingUG,
      yearOfPassingPG: form.yearOfPassingPG,
      technology: form.postTechStack.join(", "),
      workMode: form.workMode,
      probationPeriod: form.probationPeriod,
      jobLocation: form.jobLocation,
      interviewLocation: form.interviewLocation,
      interviewDate: form.interviewDate,
      interviewRounds: form.interviewRounds.filter(r => r.trim() !== ""),
      salaryDetails: form.salaryDetails,
      qualificationPercentages: {
        "10th": form.qualificationPercent10th || "70%",
        "12th": form.qualificationPercent12th || "70%",
        "UG": form.qualificationPercentUG || "70%",
        "PG": form.qualificationPercentPG || "70%"
      },
      qualificationCGPA: {
        "UG": form.qualificationCGPAUG || "7 CGPA",
        "PG": form.qualificationCGPAPG || "7 CGPA"
      },
      genderPreference: form.genderPreference,
      bondDetails: form.bondDetails,
      backlog: form.backlog
    };

    const submitData = {
      ...form,
      postDesc: JSON.stringify(structuredDesc)
    };

    axios      
      .put("http://localhost:8080/jobPost", submitData)
      .then((resp) => {
        console.log(resp.data);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('Error updating job post. Please try again.');
      });
  };

  const handleAddResponsibility = () => {
    setForm({ ...form, rolesAndResponsibilities: [...form.rolesAndResponsibilities, ""] });
  };

  const handleRemoveResponsibility = (index) => {
    const newResponsibilities = form.rolesAndResponsibilities.filter((_, i) => i !== index);
    setForm({ ...form, rolesAndResponsibilities: newResponsibilities });
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...form.rolesAndResponsibilities];
    newResponsibilities[index] = value;
    setForm({ ...form, rolesAndResponsibilities: newResponsibilities });
  };

  const handleAddInterviewRound = () => {
    setForm({ ...form, interviewRounds: [...form.interviewRounds, ""] });
  };

  const handleRemoveInterviewRound = (index) => {
    const newRounds = form.interviewRounds.filter((_, i) => i !== index);
    setForm({ ...form, interviewRounds: newRounds });
  };

  const handleInterviewRoundChange = (index, value) => {
    const newRounds = [...form.interviewRounds];
    newRounds[index] = value;
    setForm({ ...form, interviewRounds: newRounds });
  };

  const handleSkillChange = (skillName) => {
    setForm(prev => {
      const isSelected = prev.postTechStack.includes(skillName);
      return {
        ...prev,
        postTechStack: isSelected
          ? prev.postTechStack.filter(s => s !== skillName)
          : [...prev.postTechStack, skillName]
      };
    });
  };

  const skillSet = [
    { name: "Java" },
    { name: "Javascript" },
    { name: "Python" },
    { name: "Django" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "ReactJS" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Postman" },
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "MySQL" },
    { name: "Bootstrap" },
    { name: "Angular" },
    { name: "Machine Learning" },
    { name: "AI" },
    { name: "NodeJS" },
    { name: "ExpressJS" },
    { name: "C++" },
    { name: "Rust" },
    { name: "Spring Boot" },
    { name: "Hibernate" },
    { name: "TypeScript" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          animation: 'fadeIn 0.6s ease-out',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <EditIcon sx={{ fontSize: 40, color: '#667eea' }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Edit Job Post
          </Typography>
        </Box>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                onChange={(e) => setForm({ ...form, postId: e.target.value })}
                label="Post ID"
                variant="outlined"
                value={form.postId}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                required
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                label="Company Name"
                variant="outlined"
                value={form.companyName}
                placeholder="e.g., NielsenIQ, LeadSquared, MRI Software"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                onChange={(e) => setForm({ ...form, companyLogoText: e.target.value })}
                label="Company Logo Text (Optional)"
                variant="outlined"
                value={form.companyLogoText}
                placeholder="e.g., MRI, IBM, HP (Leave empty for auto-detection)"
                helperText="Text to display in company logo. If empty, will auto-generate from company name."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                required
                onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
                label="Position / Job Title"
                variant="outlined"
                value={form.postProfile}
                placeholder="e.g., Java Developer, Python Developer, Frontend Developer, Data Scientist"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                required
                inputProps={{ min: 0 }}
                onChange={(e) =>
                  setForm({ ...form, reqExperience: e.target.value })
                }
                label="Years of Experience"
                variant="outlined"
                value={form.reqExperience}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                required
                onChange={(e) => setForm({ ...form, postingDate: e.target.value })}
                label="Posting Date"
                variant="outlined"
                value={form.postingDate || new Date().toISOString().split('T')[0]}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            </Grid>

            {/* Roles & Responsibilities Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Roles & Responsibilities
              </Typography>
              {form.rolesAndResponsibilities.map((responsibility, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={responsibility}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    placeholder={`Responsibility ${index + 1}`}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(102, 126, 234, 0.3)',
                        },
                      },
                    }}
                  />
                  {form.rolesAndResponsibilities.length > 1 && (
                    <Button
                      onClick={() => handleRemoveResponsibility(index)}
                      sx={{ minWidth: 48, height: 56 }}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddResponsibility}
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Add Responsibility
              </Button>
            </Grid>

            {/* Qualification Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Qualification
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Qualification</InputLabel>
                <Select
                  value={form.qualification}
                  label="Qualification"
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                >
                  <MenuItem value="Any">Any</MenuItem>
                  <MenuItem value="B.Tech">B.Tech</MenuItem>
                  <MenuItem value="B.E">B.E</MenuItem>
                  <MenuItem value="M.Tech">M.Tech</MenuItem>
                  <MenuItem value="MCA">MCA</MenuItem>
                  <MenuItem value="BCA">BCA</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Specialization"
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                placeholder="e.g., Computer Science, IT"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year of Passing (UG)"
                value={form.yearOfPassingUG}
                onChange={(e) => setForm({ ...form, yearOfPassingUG: e.target.value })}
                placeholder="e.g., 2023, 2024"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year of Passing (PG)"
                value={form.yearOfPassingPG}
                onChange={(e) => setForm({ ...form, yearOfPassingPG: e.target.value })}
                placeholder="e.g., 2023, 2024"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Qualification Percentages */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                Qualification %
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="10th %"
                value={form.qualificationPercent10th}
                onChange={(e) => setForm({ ...form, qualificationPercent10th: e.target.value })}
                placeholder="70%"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="12th %"
                value={form.qualificationPercent12th}
                onChange={(e) => setForm({ ...form, qualificationPercent12th: e.target.value })}
                placeholder="70%"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="UG %"
                value={form.qualificationPercentUG}
                onChange={(e) => setForm({ ...form, qualificationPercentUG: e.target.value })}
                placeholder="70%"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="PG %"
                value={form.qualificationPercentPG}
                onChange={(e) => setForm({ ...form, qualificationPercentPG: e.target.value })}
                placeholder="70%"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Qualification CGPA */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Qualification (CGPA)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="UG CGPA"
                value={form.qualificationCGPAUG}
                onChange={(e) => setForm({ ...form, qualificationCGPAUG: e.target.value })}
                placeholder="7 CGPA"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PG CGPA"
                value={form.qualificationCGPAPG}
                onChange={(e) => setForm({ ...form, qualificationCGPAPG: e.target.value })}
                placeholder="7 CGPA"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Work Details Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Work Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Work Mode</InputLabel>
                <Select
                  value={form.workMode}
                  label="Work Mode"
                  onChange={(e) => setForm({ ...form, workMode: e.target.value })}
                >
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Probation Period"
                value={form.probationPeriod}
                onChange={(e) => setForm({ ...form, probationPeriod: e.target.value })}
                placeholder="e.g., 3 Months"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Location"
                value={form.jobLocation}
                onChange={(e) => setForm({ ...form, jobLocation: e.target.value })}
                placeholder="e.g., Bangalore North, India"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Interview Location"
                value={form.interviewLocation}
                onChange={(e) => setForm({ ...form, interviewLocation: e.target.value })}
                placeholder="e.g., Virtual, On-site"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Salary Details */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Salary Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Salary Details"
                value={form.salaryDetails}
                onChange={(e) => setForm({ ...form, salaryDetails: e.target.value })}
                placeholder="e.g., 3.6 LPA&#10;Internship stipend: ₹15,000-20,000 per month&#10;Post-conversion (Full-time): ₹3.6 LPA (Performance based)"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Interview Details */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Interview Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="Interview Date"
                value={form.interviewDate}
                onChange={(e) => setForm({ ...form, interviewDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                Interview Rounds
              </Typography>
              {form.interviewRounds.map((round, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={round}
                    onChange={(e) => handleInterviewRoundChange(index, e.target.value)}
                    placeholder={`Round ${index + 1}: e.g., Written Test(Virtual)`}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  {form.interviewRounds.length > 1 && (
                    <Button
                      onClick={() => handleRemoveInterviewRound(index)}
                      sx={{ minWidth: 48, height: 56 }}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddInterviewRound}
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Add Interview Round
              </Button>
            </Grid>

            {/* Registration & Application Status */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Registration & Application Status
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Registration Status</InputLabel>
                <Select
                  value={form.registrationStatus}
                  label="Registration Status"
                  onChange={(e) => setForm({ ...form, registrationStatus: e.target.value })}
                >
                  <MenuItem value="Reg. Open">Reg. Open</MenuItem>
                  <MenuItem value="Reg. Closed">Reg. Closed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                type="datetime-local"
                fullWidth
                label="Registration Deadline"
                value={form.registrationDeadline}
                onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
                InputLabelProps={{ shrink: true }}
                helperText="For countdown timer (only shown if Reg. Open)"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Application Status</InputLabel>
                <Select
                  value={form.applicationStatus}
                  label="Application Status"
                  onChange={(e) => setForm({ ...form, applicationStatus: e.target.value })}
                >
                  <MenuItem value="Eligible to Apply">Eligible to Apply</MenuItem>
                  <MenuItem value="Not Eligible">Not Eligible</MenuItem>
                  <MenuItem value="Application Submitted">Application Submitted</MenuItem>
                  <MenuItem value="Not Shortlisted">Not Shortlisted</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                Additional Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Gender Preference</InputLabel>
                <Select
                  value={form.genderPreference}
                  label="Gender Preference"
                  onChange={(e) => setForm({ ...form, genderPreference: e.target.value })}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bond Details"
                value={form.bondDetails}
                onChange={(e) => setForm({ ...form, bondDetails: e.target.value })}
                placeholder="e.g., 0 Months"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Backlog</InputLabel>
                <Select
                  value={form.backlog}
                  label="Backlog"
                  onChange={(e) => setForm({ ...form, backlog: e.target.value })}
                >
                  <MenuItem value="NOT ALLOWED">NOT ALLOWED</MenuItem>
                  <MenuItem value="ALLOWED">ALLOWED</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                Required Skills
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(102, 126, 234, 0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                }}
              >
                <Grid container spacing={1.5}>
                  {skillSet.map(({ name }, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form.postTechStack?.includes(name) || false}
                            onChange={() => handleSkillChange(name)}
                            sx={{
                              color: '#667eea',
                              '&.Mui-checked': {
                                color: '#667eea',
                              },
                            }}
                          />
                        }
                        label={name}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              {form.postTechStack && form.postTechStack.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {form.postTechStack.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleSkillChange(skill)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
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
                Update Job Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Edit;
