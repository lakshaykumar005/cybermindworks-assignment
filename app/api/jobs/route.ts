import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.jobTitle || !data.companyName) {
      return NextResponse.json(
        { error: 'jobTitle and companyName are required' },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        location: data.location || null,
        jobType: data.jobType || null,
        salaryMin: Number(data.salaryMin),
        salaryMax: Number(data.salaryMax),
        jobDescription: data.jobDescription || null,
        requirements: data.requirements || null,
        responsibilities: data.responsibilities || null,
        applicationDeadline: data.applicationDeadline,
      },
    });
    
    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to create job', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error.message },
      { status: 500 }
    );
  }
}