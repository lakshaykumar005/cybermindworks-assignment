import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const job = await prisma.job.create({
      data: {
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        location: data.location,
        jobType: data.jobType,
        salaryMin: Number(data.salaryMin),
        salaryMax: Number(data.salaryMax),
        jobDescription: data.jobDescription,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        applicationDeadline: data.applicationDeadline,
      },
    });
    return NextResponse.json(job);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}