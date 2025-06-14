
import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin1' | 'admin2' | 'admin3';
  balance: number;
  phone?: string;
  address?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  occupation?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  accountNumber?: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  category: string;
  amount: number;
  purpose: string;
  term: number;
  comment?: string;
  status: {
    admin1: 'pending' | 'approved' | 'rejected';
    admin2: 'pending' | 'approved' | 'rejected';
    admin3: 'pending' | 'approved' | 'rejected';
    current: 'processing' | 'approved' | 'rejected';
    currentAdmin: 'admin1' | 'admin2' | 'admin3' | 'complete';
  };
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  description: string;
  date: Date;
}

interface DataContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  applications: LoanApplication[];
  transactions: Transaction[];
  addLoanApplication: (application: Omit<LoanApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (applicationId: string, admin: 'admin1' | 'admin2' | 'admin3', status: 'approved' | 'rejected', comment?: string) => void;
  getUserApplications: (userId: string) => LoanApplication[];
  getAllApplications: () => LoanApplication[];
  getAdminApplications: (adminLevel: 'admin1' | 'admin2' | 'admin3') => LoanApplication[];
  getUserTransactions: (userId: string) => Transaction[];
  getUserById: (userId: string) => User | undefined;
}

// Sample data
const sampleUsers: User[] = [
  { 
    id: 'user1', 
    name: 'Rajesh Kumar', 
    email: 'rajesh.kumar@example.in', 
    role: 'user', 
    balance: 35000,
    phone: '+91 98765 43210',
    address: '123, FC Road, Pune, Maharashtra, 411004',
    panNumber: 'ABCPK1234F',
    aadhaarNumber: '1234 5678 9012',
    age: 34,
    gender: 'Male',
    occupation: 'Software Engineer',
    maritalStatus: 'Married',
    accountNumber: '1234567890123456'
  },
  { 
    id: 'user2', 
    name: 'Priya Sharma', 
    email: 'priya.sharma@example.in', 
    role: 'user', 
    balance: 28000,
    phone: '+91 91234 56789',
    address: 'Flat No. 405, Kalyani Nagar, Pune, Maharashtra, 411006',
    panNumber: 'BCDPS6789K',
    aadhaarNumber: '2345 6789 0123',
    age: 28,
    gender: 'Female',
    occupation: 'Marketing Executive',
    maritalStatus: 'Single',
    accountNumber: '2345678901234567'
  },
  { 
    id: 'user3', 
    name: 'Anil Verma', 
    email: 'anil.verma@example.in', 
    role: 'user', 
    balance: 42000,
    phone: '+91 99887 66554',
    address: '56, Baner Road, Pune, Maharashtra, 411045',
    panNumber: 'CDEPV4567L',
    aadhaarNumber: '3456 7890 1234',
    age: 42,
    gender: 'Male',
    occupation: 'Banker',
    maritalStatus: 'Married',
    accountNumber: '3456789012345678'
  },
  { 
    id: 'user4', 
    name: 'Sneha Reddy', 
    email: 'sneha.reddy@example.in', 
    role: 'user', 
    balance: 22000,
    phone: '+91 98765 12345',
    address: 'House No. 10, Aundh, Pune, Maharashtra, 411007',
    panNumber: 'DEFRS2345M',
    aadhaarNumber: '4567 8901 2345',
    age: 31,
    gender: 'Female',
    occupation: 'Graphic Designer',
    maritalStatus: 'Single',
    accountNumber: '4567890123456789'
  },
  { 
    id: 'user5', 
    name: 'Vikram Singh', 
    email: 'vikram.singh@example.in', 
    role: 'user', 
    balance: 59000,
    phone: '+91 94561 78901',
    address: '89, Viman Nagar, Pune, Maharashtra, 411014',
    panNumber: 'EFGTS7890N',
    aadhaarNumber: '5678 9012 3456',
    age: 38,
    gender: 'Male',
    occupation: 'Chartered Accountant',
    maritalStatus: 'Married',
    accountNumber: '5678901234567890'
  },
  { id: 'admin1', name: 'Admin KYC', email: 'admin1@example.com', role: 'admin1', balance: 0 },
  { id: 'admin2', name: 'Admin Employee', email: 'admin2@example.com', role: 'admin2', balance: 0 },
  { id: 'admin3', name: 'Admin Manager', email: 'admin3@example.com', role: 'admin3', balance: 0 },
];

const sampleApplications: LoanApplication[] = [
  {
    id: 'app1',
    userId: 'user1',
    category: 'Personal Loan',
    amount: 5000,
    purpose: 'Home Renovation',
    term: 12,
    comment: 'Need funds for kitchen remodeling',
    status: {
      admin1: 'approved',
      admin2: 'pending',
      admin3: 'pending',
      current: 'processing',
      currentAdmin: 'admin2',
    },
    createdAt: new Date('2023-05-10'),
  },
  {
    id: 'app2',
    userId: 'user2',
    category: 'Car Loan',
    amount: 300000,
    purpose: 'New Vehicle Purchase',
    term: 36,
    status: {
      admin1: 'approved',
      admin2: 'approved',
      admin3: 'pending',
      current: 'processing',
      currentAdmin: 'admin3',
    },
    createdAt: new Date('2023-04-15'),
  },
  {
    id: 'app3',
    userId: 'user3',
    category: 'Education Loan',
    amount: 150000,
    purpose: 'MBA Fees',
    term: 48,
    comment: 'For my daughter\'s MBA program',
    status: {
      admin1: 'rejected',
      admin2: 'pending',
      admin3: 'pending',
      current: 'rejected',
      currentAdmin: 'complete',
    },
    createdAt: new Date('2023-06-01'),
  },
  {
    id: 'app4',
    userId: 'user1',
    category: 'Business Loan',
    amount: 1000000,
    purpose: 'Expansion',
    term: 60,
    status: {
      admin1: 'approved',
      admin2: 'approved',
      admin3: 'approved',
      current: 'approved',
      currentAdmin: 'complete',
    },
    createdAt: new Date('2023-03-20'),
  },
  {
    id: 'app5',
    userId: 'user4',
    category: 'Personal Loan',
    amount: 75000,
    purpose: 'Medical Expenses',
    term: 24,
    comment: 'For dental surgery',
    status: {
      admin1: 'approved',
      admin2: 'rejected',
      admin3: 'pending',
      current: 'rejected',
      currentAdmin: 'complete',
    },
    createdAt: new Date('2023-07-05'),
  },
  {
    id: 'app6',
    userId: 'user5',
    category: 'Home Loan',
    amount: 2500000,
    purpose: 'Property Purchase',
    term: 180,
    status: {
      admin1: 'approved',
      admin2: 'approved',
      admin3: 'approved',
      current: 'approved',
      currentAdmin: 'complete',
    },
    createdAt: new Date('2023-02-28'),
  },
];

const sampleTransactions: Transaction[] = [
  {
    id: 'trx1',
    userId: 'user1',
    amount: 1000,
    type: 'credit',
    category: 'Salary',
    description: 'Monthly salary credit',
    date: new Date('2023-05-01'),
  },
  {
    id: 'trx2',
    userId: 'user1',
    amount: 200,
    type: 'debit',
    category: 'Shopping',
    description: 'Grocery shopping',
    date: new Date('2023-05-05'),
  },
  {
    id: 'trx3',
    userId: 'user1',
    amount: 50,
    type: 'debit',
    category: 'Entertainment',
    description: 'Movie tickets',
    date: new Date('2023-05-08'),
  },
];

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(sampleUsers);
  const [applications, setApplications] = useState<LoanApplication[]>(sampleApplications);
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  const addLoanApplication = (application: Omit<LoanApplication, 'id' | 'createdAt' | 'status'>) => {
    const newApplication: LoanApplication = {
      ...application,
      id: `app${applications.length + 1}`,
      createdAt: new Date(),
      status: {
        admin1: 'pending',
        admin2: 'pending',
        admin3: 'pending',
        current: 'processing',
        currentAdmin: 'admin1',
      },
    };
    
    setApplications(prev => [...prev, newApplication]);
  };

  const updateApplicationStatus = (
    applicationId: string,
    admin: 'admin1' | 'admin2' | 'admin3',
    status: 'approved' | 'rejected',
    comment?: string // Make comment an optional parameter
  ) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === applicationId) {
          const updatedStatus = { ...app.status, [admin]: status };
          
          // Update current admin and status based on the approval flow
          let currentAdmin: 'admin1' | 'admin2' | 'admin3' | 'complete' = app.status.currentAdmin;
          let current: 'processing' | 'approved' | 'rejected' = app.status.current;
          
          if (status === 'rejected') {
            current = 'rejected';
            currentAdmin = 'complete';
          } else if (status === 'approved') {
            if (admin === 'admin1') {
              currentAdmin = 'admin2';
            } else if (admin === 'admin2') {
              currentAdmin = 'admin3';
            } else if (admin === 'admin3') {
              current = 'approved';
              currentAdmin = 'complete';
            }
          }
          
          // Add the comment if provided (for rejection reasons)
          return {
            ...app,
            ...(comment ? { comment } : {}),
            status: {
              ...updatedStatus,
              current,
              currentAdmin,
            },
          };
        }
        return app;
      })
    );
  };

  const getUserApplications = (userId: string) => {
    return applications.filter(app => app.userId === userId);
  };

  const getAllApplications = () => {
    return applications;
  };

  const getAdminApplications = (adminLevel: 'admin1' | 'admin2' | 'admin3') => {
    switch (adminLevel) {
      case 'admin1':
        // Admin 1 sees all new applications
        return applications.filter(app => app.status.currentAdmin === 'admin1');
      case 'admin2':
        // Admin 2 sees applications approved by admin1
        return applications.filter(app => 
          app.status.admin1 === 'approved' && app.status.currentAdmin === 'admin2'
        );
      case 'admin3':
        // Admin 3 sees applications approved by admin2
        return applications.filter(app => 
          app.status.admin1 === 'approved' && 
          app.status.admin2 === 'approved' && 
          app.status.currentAdmin === 'admin3'
        );
      default:
        return [];
    }
  };

  const getUserTransactions = (userId: string) => {
    return transactions.filter(trx => trx.userId === userId);
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const value: DataContextType = {
    currentUser,
    setCurrentUser,
    users,
    applications,
    transactions,
    addLoanApplication,
    updateApplicationStatus,
    getUserApplications,
    getAllApplications,
    getAdminApplications,
    getUserTransactions,
    getUserById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
