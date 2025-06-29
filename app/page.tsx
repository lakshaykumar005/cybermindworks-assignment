'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Text,
  Badge,
  Button,
  TextInput,
  Select,
  RangeSlider,
  Group,
  Stack,
  Title,
  Box,
  Avatar,
  Flex,
  Paper,
  Slider,
  Modal,
  Textarea,
  ActionIcon,
} from '@mantine/core';
import { IconSearch, IconMapPin, IconUsers, IconPlus } from '@tabler/icons-react';
import { Job, JobFilters, JOB_TYPES, LOCATIONS } from '../types/job';
import { useForm, Controller } from 'react-hook-form';

// Mock data - will be replaced with API calls
const mockJobs: Job[] = [
  {
    id: '1',
    jobTitle: 'Full Stack Developer',
    companyName: 'Amazon',
    location: 'Chennai',
    jobType: 'Full-time',
    salaryRange: { min: 12, max: 12 },
    jobDescription: 'Build scalable web applications and APIs.',
    requirements: 'React, Node.js, TypeScript',
    responsibilities: 'Develop, test, and deploy web apps.',
    applicationDeadline: '2024-08-01',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    jobTitle: 'Node Js Developer',
    companyName: 'Tesla',
    location: 'Bangalore',
    jobType: 'Full-time',
    salaryRange: { min: 15, max: 18 },
    jobDescription: 'Work on backend systems for electric vehicles.',
    requirements: 'Node.js, Express, MongoDB',
    responsibilities: 'Maintain and optimize backend services.',
    applicationDeadline: '2024-07-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    jobTitle: 'UX/UI Designer',
    companyName: 'Swiggy',
    location: 'Mumbai',
    jobType: 'Part-time',
    salaryRange: { min: 9, max: 12 },
    jobDescription: 'Design beautiful and user-friendly interfaces.',
    requirements: 'Figma, Adobe XD, UI/UX Design',
    responsibilities: 'Work with product and engineering teams.',
    applicationDeadline: '2024-07-30',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
  },
  {
    id: '4',
    jobTitle: 'Backend Engineer',
    companyName: 'Microsoft',
    location: 'Hyderabad',
    jobType: 'Contract',
    salaryRange: { min: 20, max: 25 },
    jobDescription: 'Build scalable backend services and APIs.',
    requirements: 'C#, .NET, Azure',
    responsibilities: 'Develop, test, and deploy backend services.',
    applicationDeadline: '2024-09-01',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: '5',
    jobTitle: 'Frontend Developer',
    companyName: 'Google',
    location: 'Pune',
    jobType: 'Internship',
    salaryRange: { min: 5, max: 7 },
    jobDescription: 'Work on the next generation of web applications.',
    requirements: 'JavaScript, React, HTML, CSS',
    responsibilities: 'Collaborate with designers and backend engineers.',
    applicationDeadline: '2024-08-15',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: '6',
    jobTitle: 'Data Scientist',
    companyName: 'Amazon',
    location: 'Delhi',
    jobType: 'Full-time',
    salaryRange: { min: 25, max: 30 },
    jobDescription: 'Analyze large datasets to drive business insights.',
    requirements: 'Python, Machine Learning, SQL',
    responsibilities: 'Build predictive models and data pipelines.',
    applicationDeadline: '2024-10-01',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: '7',
    jobTitle: 'Mobile App Developer',
    companyName: 'Swiggy',
    location: 'Remote',
    jobType: 'Contract',
    salaryRange: { min: 13, max: 16 },
    jobDescription: 'Develop and maintain mobile applications.',
    requirements: 'Flutter, Dart, React Native',
    responsibilities: 'Ship high-quality mobile apps.',
    applicationDeadline: '2024-09-15',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
  },
  {
    id: '8',
    jobTitle: 'DevOps Engineer',
    companyName: 'Tesla',
    location: 'Bangalore',
    jobType: 'Full-time',
    salaryRange: { min: 17, max: 20 },
    jobDescription: 'Automate and optimize our cloud infrastructure.',
    requirements: 'AWS, Docker, Kubernetes',
    responsibilities: 'Ensure high availability and scalability.',
    applicationDeadline: '2024-11-01',
    createdAt: '2024-04-01',
    updatedAt: '2024-04-01',
  },
];

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    jobType: '',
    salaryRange: [10, 300],
  });
  const [modalOpened, setModalOpened] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // React Hook Form setup for the modal
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      jobTitle: '',
      companyName: '',
      location: '',
      jobType: '',
      salaryMin: '',
      salaryMax: '',
      applicationDeadline: '',
      jobDescription: '',
      requirements: '',
      responsibilities: '',
    },
  });

  // Load draft from sessionStorage when modal opens
  useEffect(() => {
    if (modalOpened) {
      const savedDraft = sessionStorage.getItem('jobDraft');
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          Object.keys(draftData).forEach(key => {
            setValue(key as any, draftData[key]);
          });
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    }
  }, [modalOpened, setValue]);

  // Save draft to sessionStorage
  const saveDraft = () => {
    const draft = getValues();
    sessionStorage.setItem('jobDraft', JSON.stringify(draft));
    console.log('Draft saved:', draft);
  };

  // Clear draft from sessionStorage
  const clearDraft = () => {
    sessionStorage.removeItem('jobDraft');
  };

  // Watch all form fields for validation
  const watchedFields = watch();
  
  // Check if all fields are filled
  useEffect(() => {
    const allFieldsFilled = 
      watchedFields.jobTitle?.trim() !== '' &&
      watchedFields.companyName?.trim() !== '' &&
      watchedFields.location?.trim() !== '' &&
      watchedFields.jobType?.trim() !== '' &&
      watchedFields.salaryMin?.toString().trim() !== '' &&
      watchedFields.salaryMax?.toString().trim() !== '' &&
      watchedFields.applicationDeadline?.trim() !== '' &&
      watchedFields.jobDescription?.trim() !== '' &&
      watchedFields.requirements?.trim() !== '' &&
      watchedFields.responsibilities?.trim() !== '';
    
    setIsFormValid(allFieldsFilled);
  }, [watchedFields]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        
        // Only replace jobs if there are jobs in the database
        if (data.length > 0) {
          // Transform salaryMin/salaryMax to salaryRange
          const jobsFromApi = data.map((job: any) => ({
            ...job,
            salaryRange: { min: job.salaryMin, max: job.salaryMax },
          }));
          
          // Replace existing jobs starting from the first position
          // Keep the same total number of cards by combining database jobs with remaining mock jobs
          const remainingMockJobs = mockJobs.slice(data.length);
          setJobs([...jobsFromApi, ...remainingMockJobs]);
        }
        // If no jobs in database, keep the mock jobs as they are
      } catch (err) {
        console.error('Error fetching jobs:', err);
        // Keep mock jobs on error
      }
    }
    fetchJobs();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      // Save job to the database via API
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Clear the draft since job was published successfully
        clearDraft();
        
        // Refetch jobs from database to show the new job immediately
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const fetchedJobs = await res.json();
          if (fetchedJobs.length > 0) {
            // Transform salaryMin/salaryMax to salaryRange
            const jobsFromApi = fetchedJobs.map((job: any) => ({
              ...job,
              salaryRange: { min: job.salaryMin, max: job.salaryMax },
            }));
            
            // Replace existing jobs starting from the first position
            const remainingMockJobs = mockJobs.slice(fetchedJobs.length);
            setJobs([...jobsFromApi, ...remainingMockJobs]);
          }
        }
      }
      
      setModalOpened(false);
      reset();
    } catch (error) {
      console.error('Error publishing job:', error);
    }
  };

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCompanyLogo = (company: string) => {
    const logos: { [key: string]: string } = {
      'Amazon': '/amazonlogo.png',
      'Tesla': '/teslalogo.png',
      'Swiggy': '/swiggylogo.png',
      'Cybermindworks': '/cybermindworkslogo.png',
      'Microsoft': '/amazonlogo.png', // fallback for Microsoft
      'Google': '/teslalogo.png',    // fallback for Google
    };
    return logos[company] || '/cybermindworkslogo.png';
  };

  const getCompanyColor = (company: string) => {
    const colors: { [key: string]: string } = {
      'Amazon': '#FF9500',
      'Tesla': '#CC0000',
      'Swiggy': '#FC8019',
      'Microsoft': '#00BCF2',
    };
    return colors[company] || '#339AF0';
  };

  // Filtering logic for jobs
  const filteredJobs = jobs.filter((job) => {
    // Check if job is expired (except for mock jobs)
    const isMockJob = mockJobs.some(mockJob => mockJob.id === job.id);
    if (!isMockJob) {
      const deadline = new Date(job.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
      if (deadline < today) {
        return false; // Hide expired jobs
      }
    }

    // Enhanced Search filter (job title, company name, or job description)
    const searchText = filters.search.trim().toLowerCase();
    const searchMatch =
      searchText === '' ||
      job.jobTitle.toLowerCase().includes(searchText) ||
      job.companyName.toLowerCase().includes(searchText) ||
      job.jobDescription.toLowerCase().includes(searchText);

    // Location filter
    const locationMatch =
      !filters.location || job.location === filters.location;

    // Job type filter
    const jobTypeMatch =
      !filters.jobType || job.jobType === filters.jobType;

    // Salary range filter (convert K's to LPA for comparison)
    // 1 LPA = 12 months, so 1K per month = 1 LPA / 12 = 0.083 LPA
    const minSalaryInLPA = filters.salaryRange[0] * 0.083; // Convert K's to LPA
    const maxSalaryInLPA = filters.salaryRange[1] * 0.083; // Convert K's to LPA
    
    // Debug log (only in development)
    if (process.env.NODE_ENV === 'development' && filters.salaryRange[0] !== 10) {
      console.log(`Filter: ${filters.salaryRange[0]}K-${filters.salaryRange[1]}K = ${minSalaryInLPA.toFixed(2)}-${maxSalaryInLPA.toFixed(2)} LPA`);
      console.log(`Job: ${job.jobTitle} - ${job.salaryRange.max} LPA`);
      const isInRange = job.salaryRange.max >= minSalaryInLPA && job.salaryRange.max <= maxSalaryInLPA;
      console.log(`In Range: ${isInRange ? '✅' : '❌'}`);
    } else if (process.env.NODE_ENV === 'development' && filters.salaryRange[0] === 10 && filters.salaryRange[1] === 300) {
      console.log(`All Salaries Mode: ${job.jobTitle} - ${job.salaryRange.max} LPA ✅`);
    }
    
    const salaryMatch =
      (!filters.salaryRange || 
       (filters.salaryRange[0] === 10 && filters.salaryRange[1] === 300) || // Show all when at full range
       (job.salaryRange.max >= minSalaryInLPA && job.salaryRange.max <= maxSalaryInLPA)); // Show jobs within the selected range

    return searchMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  // Helper to check if a job is a new card (created in this session)
  const isNewJob = (job: Job) => {
    // If createdAt is an ISO string with time, it's a new card
    return job.createdAt && job.createdAt.length > 10;
  };

  // Helper to get time ago string
  const getTimeAgo = (isoDate: string) => {
    const created = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} h ago`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD}d ago`;
  };

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Filter Bar Background - full width, top of page, behind header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: 210, // enough to cover the filter bar area
        background: '#fff',
        zIndex: 0,
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)'
      }} />
      {/* Header */}
      <header style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08)', borderRadius: 100, margin: '32px auto 24px', maxWidth: 900, padding: '0 16px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <img src="/cybermindworkslogo.png" alt="Logo" style={{ width: 36, height: 36, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexShrink: 0 }} />
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, marginLeft: 32, marginRight: 32 }}>
            <span style={{ fontWeight: 600, color: '#222', fontSize: 16, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Home</span>
            <span style={{ fontWeight: 600, color: '#222', fontSize: 16, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Find Jobs</span>
            <span style={{ fontWeight: 600, color: '#222', fontSize: 16, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Find Talents</span>
            <span style={{ fontWeight: 600, color: '#222', fontSize: 16, cursor: 'pointer', flex: 1, textAlign: 'center' }}>About us</span>
            <span style={{ fontWeight: 600, color: '#222', fontSize: 16, cursor: 'pointer', flex: 1, textAlign: 'center' }}>Testimonials</span>
          </nav>
        </div>
        <button
          style={{ background: 'linear-gradient(90deg, #A128FF 0%, #6100AD 100%)', color: '#fff', border: 'none', borderRadius: 100, padding: '8px 20px', fontWeight: 600, fontSize: 15, boxShadow: '0 2px 8px rgba(123,63,242,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
          onClick={() => setModalOpened(true)}
        >
          Create Jobs
        </button>
      </header>

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Filters Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'transparent',
          borderRadius: 16,
          boxShadow: 'none',
          padding: '24px 32px',
          margin: '0 0 32px 0',
          gap: 0,
          minHeight: 80,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 12 }}>
            <IconSearch size={22} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search By Job Title, Role"
              variant="unstyled"
              style={{ flex: 1, fontSize: 18, color: '#222' }}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div style={{ width: 1, height: 40, background: '#eaeaea', margin: '0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 12 }}>
            <IconMapPin size={22} color="#888" style={{ marginRight: 8 }} />
            <Select
              placeholder="Preferred Location"
              variant="unstyled"
              style={{ flex: 1, fontSize: 18, color: '#222' }}
              data={LOCATIONS.map(loc => ({ value: loc, label: loc }))}
              value={filters.location}
              onChange={(value) => handleFilterChange('location', value)}
              clearable
            />
          </div>
          <div style={{ width: 1, height: 40, background: '#eaeaea', margin: '0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 12 }}>
            <IconUsers size={22} color="#888" style={{ marginRight: 8 }} />
            <Select
              placeholder="Job type"
              variant="unstyled"
              style={{ flex: 1, fontSize: 18, color: '#222' }}
              data={JOB_TYPES.map(type => ({ value: type, label: type }))}
              value={filters.jobType}
              onChange={(value) => handleFilterChange('jobType', value)}
              clearable
            />
          </div>
          <div style={{ width: 1, height: 40, background: '#eaeaea', margin: '0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', flex: 2, gap: 16, minWidth: 260 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, width: '100%' }}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontWeight: 500, color: '#222', fontSize: 16, textAlign: 'left' }}>Salary Per Month</span>
                <span style={{ color: '#222', fontWeight: 500, fontSize: 16, textAlign: 'right', marginRight: '76px' }}>
                  {filters.salaryRange[0] === 10 && filters.salaryRange[1] === 300 
                    ? 'All Salaries' 
                    : `₹${filters.salaryRange[0]}K - ₹${filters.salaryRange[1]}K`
                  }
                </span>
              </div>
              <RangeSlider
                min={10}
                max={300}
                step={10}
                minRange={20}
                value={filters.salaryRange}
                onChange={(value) => handleFilterChange('salaryRange', value)}
                style={{ width: '100%', maxWidth: 320, marginTop: 8 }}
                color="#000"
                thumbSize={18}
                className="custom-salary-slider"
                label={null}
              />
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginTop: 24, marginBottom: '48px', minHeight: 200 }}>
          {filteredJobs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', fontSize: 22, fontWeight: 500, padding: '60px 0' }}>
              No jobs available for now
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="job-card"
                style={{ backgroundColor: 'white', cursor: 'pointer', position: 'relative', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
              >
                <Card.Section p="md" pb="xs">
                  <Group justify="space-between" align="flex-start">
                    <div style={{ background: '#fff', borderRadius: 12, padding: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      <Avatar
                        size={56}
                        radius={12}
                        src={getCompanyLogo(job.companyName)}
                        style={{ backgroundColor: '#fff' }}
                      >
                        {job.companyName[0]}
                      </Avatar>
                    </div>
                    <Badge
                      size="md"
                      style={{ background: '#B0D9FF', color: '#222', fontWeight: 300, fontSize: 12, borderRadius: 8, padding: '6px 14px', letterSpacing: 0.2, textTransform: 'none' }}
                    >
                      {isNewJob(job) ? getTimeAgo(job.createdAt) : '24h Ago'}
                    </Badge>
                  </Group>
                </Card.Section>
                <Stack gap="xs" mt="sm">
                  <Title order={4} size="md" fw={600} c="dark">
                    {job.jobTitle}
                  </Title>
                  <Group gap="xs" c="gray.6">
                    <Group gap="xs">
                      <IconUsers size={14} />
                      <Text size="sm">1-3 yr Exp</Text>
                    </Group>
                    <Group gap="xs">
                      <IconMapPin size={14} />
                      <Text size="sm">Onsite</Text>
                    </Group>
                    <Text size="sm">₹{job.salaryRange.max}LPA</Text>
                  </Group>
                  <Box mt="xs">
                    <Text size="sm" c="gray.7" lineClamp={3}>
                      • {job.jobDescription}
                    </Text>
                    <Text size="sm" c="gray.7" mt="xs" lineClamp={2}>
                      • {job.responsibilities}
                    </Text>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  mt="auto"
                  size="md"
                  style={{
                    backgroundColor: '#1da1f2',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    borderRadius: 8,
                    marginTop: 12,
                    marginBottom: 6,
                    height: 36,
                    padding: '0 12px',
                    boxShadow: '0 2px 8px rgba(33,150,243,0.10)'
                  }}
                >
                  Apply Now
                </Button>
              </Card>
            ))
          )}
        </div>
      </Container>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        centered
        size="lg"
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.7, blur: 2 }}
        styles={{ body: { padding: 0 } }}
      >
        <Box style={{ padding: 40, borderRadius: 20, background: '#fff', minWidth: 600, maxWidth: 700 }}>
          <Title order={2} style={{ textAlign: 'center', fontWeight: 700, marginBottom: 32 }}>Create Job Opening</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <TextInput label="Job Title" placeholder="Full Stack Developer" style={{ flex: 1 }} size="md" radius="md" {...register('jobTitle')} />
              <TextInput label="Company Name" placeholder="Amazon, Microsoft, Swiggy" style={{ flex: 1 }} size="md" radius="md" {...register('companyName')} />
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Location"
                    placeholder="Choose Preferred Location"
                    data={LOCATIONS.map(loc => ({ value: loc, label: loc }))}
                    style={{ flex: 1 }}
                    size="md"
                    radius="md"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    placeholder="FullTime"
                    data={JOB_TYPES.map(type => ({ value: type, label: type }))}
                    style={{ flex: 1 }}
                    size="md"
                    radius="md"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Text size="sm" style={{ fontWeight: 500, marginBottom: 4 }}>Salary Range(In LPA)</Text>
                <div style={{ display: 'flex', gap: 12 }}>
                  <TextInput
                    placeholder="0"
                    size="md"
                    radius="md"
                    style={{ flex: 1, paddingLeft: 8 }}
                    leftSection={<span style={{ color: '#888' }}>₹</span>}
                    {...register('salaryMin')}
                  />
                  <TextInput
                    placeholder="12"
                    size="md"
                    radius="md"
                    style={{ flex: 1, paddingLeft: 8 }}
                    leftSection={<span style={{ color: '#888' }}>₹</span>}
                    {...register('salaryMax')}
                  />
                </div>
              </div>
              <TextInput
                label="Application Deadline"
                placeholder=""
                type="date"
                style={{ flex: 1 }}
                size="md"
                radius="md"
                min={new Date().toISOString().split('T')[0]}
                {...register('applicationDeadline', {
                  validate: (value) => {
                    if (!value) return 'Application deadline is required';
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selectedDate < today) {
                      return 'Application deadline cannot be in the past';
                    }
                    return true;
                  }
                })}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                minRows={4}
                size="md"
                radius="md"
                autosize
                {...register('jobDescription')}
              />
            </div>
            <div style={{ marginBottom: 24, display: 'flex', gap: 24 }}>
              <Textarea
                label="Requirements"
                placeholder="List the requirements for the job role"
                minRows={2}
                size="md"
                radius="md"
                autosize
                style={{ flex: 1 }}
                {...register('requirements')}
              />
              <Textarea
                label="Responsibilities"
                placeholder="List the responsibilities for the job role"
                minRows={2}
                size="md"
                radius="md"
                autosize
                style={{ flex: 1 }}
                {...register('responsibilities')}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
              <Button
                variant="outline"
                size="md"
                style={{ fontWeight: 600, fontSize: 18, borderRadius: 8, padding: '0 32px', height: 48 }}
                type="button"
                onClick={() => {
                  saveDraft();
                  reset();
                  setModalOpened(false);
                }}
              >
                Save Draft
              </Button>
              <Button
                size="md"
                style={{ background: '#1da1f2', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 8, padding: '0 32px', height: 48 }}
                type="submit"
                disabled={!isFormValid}
              >
                Publish &nbsp; &raquo;
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}