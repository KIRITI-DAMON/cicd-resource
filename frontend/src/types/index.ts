
export type UserRole = 'Admin' | 'Student'; // Admin is Editor, Student is Author

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  department: string; 
  gpa: number; 
  joinedDate: string;
  avatarUrl?: string;
}

export type SubmissionStatus = 'Submitted' | 'Under Review' | 'Revisions Required' | 'Accepted' | 'Rejected' | 'Published';

export interface Submission {
    id: string;
    title: string;
    author: string;
    abstract: string;
    submittedDate: string;
    status: SubmissionStatus;
    journal: string;
    fileUrl?: string;
}
