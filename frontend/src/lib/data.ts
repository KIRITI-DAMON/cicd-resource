
import { User, Submission } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

const avatar1 = PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl;
const avatar2 = PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl;
const avatar3 = PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl;
const avatar4 = PlaceHolderImages.find(img => img.id === 'avatar-4')?.imageUrl;

export const mockUsers: User[] = [
  {
    uid: 'admin001',
    name: 'Dr. Evelyn Reed',
    email: 'admin@example.com',
    role: 'Admin',
    department: 'Computer Science',
    gpa: 4.0,
    joinedDate: '2018-08-15',
    avatarUrl: avatar1,
  },
  {
    uid: 'student001',
    name: 'Samuel Green',
    email: 'tenant1@example.com',
    role: 'Student', 
    department: 'Physics',
    gpa: 3.8,
    joinedDate: '2023-09-01',
    avatarUrl: avatar2,
  },
  {
    uid: 'student002',
    name: 'Dr. Peter Jones',
    email: 'tenant2@example.com',
    role: 'Student',
    department: 'Chemistry',
    gpa: 3.9,
    joinedDate: '2022-09-01',
    avatarUrl: avatar3,
  },
  {
    uid: 'student003',
    name: 'Mary Williams',
    email: 'tenant3@example.com',
    role: 'Student',
    department: 'Biology',
    gpa: 3.5,
    joinedDate: '2023-09-01',
    avatarUrl: avatar4,
  },
];

export const mockSubmissions: Submission[] = [
    {
        id: 'sub001',
        title: 'The Impact of Quantum Computing on Cryptography',
        author: 'Samuel Green',
        abstract: 'This paper explores the potential vulnerabilities in current cryptographic standards posed by the advent of quantum computing and proposes new quantum-resistant algorithms.',
        submittedDate: '2024-07-15',
        status: 'Under Review',
        journal: 'Journal of Cryptography',
    },
    {
        id: 'sub002',
        title: 'A Novel Approach to Carbon Sequestration Using Algae Bioreactors',
        author: 'Mary Williams',
        abstract: 'We present a cost-effective and scalable model for carbon sequestration utilizing genetically modified algae in closed-loop bioreactors.',
        submittedDate: '2024-07-20',
        status: 'Revisions Required',
        journal: 'Environmental Science Today',
    },
    {
        id: 'sub003',
        title: 'Machine Learning Models for Predicting Protein Folding',
        author: 'Samuel Green',
        abstract: 'A comparative analysis of various deep learning architectures for the accurate prediction of protein secondary and tertiary structures.',
        submittedDate: '2024-06-10',
        status: 'Published',
        journal: 'Journal of Computational Biology',
    },
    {
        id: 'sub004',
        title: 'The Role of Dark Matter in Galactic Formation',
        author: 'Dr. Peter Jones',
        abstract: 'This review summarizes the current evidence for dark matter and its crucial role in the formation and evolution of galaxies.',
        submittedDate: '2024-05-01',
        status: 'Published',
        journal: 'Astrophysical Journal',
    },
    {
        id: 'sub005',
        title: 'Synthesis of a New Catalyst for Hydrogen Production',
        author: 'Mary Williams',
        abstract: 'We report the successful synthesis of a novel, low-cost catalyst that significantly improves the efficiency of water splitting for hydrogen production.',
        submittedDate: '2024-07-28',
        status: 'Submitted',
        journal: 'Journal of Materials Chemistry',
    },
     {
        id: 'sub006',
        title: 'The Sociological Impact of Social Media on Adolescent Behavior',
        author: 'Dr. Evelyn Reed',
        abstract: 'This longitudinal study examines the correlation between social media usage and behavioral changes in adolescents over a five-year period.',
        submittedDate: '2024-04-12',
        status: 'Published',
        journal: 'Journal of Adolescent Psychology',
    }
];

// Keep old exports for compatibility if needed, but they are empty
export const mockArticles: any[] = [];
export const mockProperties: any[] = [];
export const mockTenants: any[] = [];
export const mockPayments: any[] = [];
export const mockMaintenance: any[] = [];
