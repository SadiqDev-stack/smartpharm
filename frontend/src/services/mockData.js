// frontend/src/services/mockData.js

export const mockProducts = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Paracetamol 500mg",
    type: "tablet",
    dosage: {
      pregnantAllowed: true,
      sensitive: false,
      breakdown: [
        { label: "Adult", description: "1-2 tablets every 4-6 hours", ageRange: "12+" },
        { label: "Child", description: "1/2 tablet every 4-6 hours", ageRange: "6-12" }
      ]
    },
    pricing: [
      { unit: "tablet", amount: 50, quantity: 1 },
      { unit: "strip", amount: 500, quantity: 10 },
      { unit: "box", amount: 4500, quantity: 100 }
    ],
    stock: 250,
    expiryDate: "2025-12-31",
    relatedProducts: [],
    otherNames: ["Acetaminophen", "Panadol"],
    priceHistory: [
      { date: "2024-01-01", price: 450, unit: "strip" },
      { date: "2024-06-01", price: 500, unit: "strip" }
    ],
    invoiceCount: 45,
    mediaSource: "N/A",
    pinned: true,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    isImported: false,
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Amoxicillin 250mg",
    type: "capsule",
    dosage: {
      pregnantAllowed: false,
      sensitive: true,
      breakdown: [
        { label: "Adult", description: "1 capsule every 8 hours", ageRange: "12+" },
        { label: "Child", description: "1/2 capsule every 8 hours", ageRange: "6-12" }
      ]
    },
    pricing: [
      { unit: "capsule", amount: 100, quantity: 1 },
      { unit: "strip", amount: 1000, quantity: 10 },
      { unit: "box", amount: 9000, quantity: 100 }
    ],
    stock: 120,
    expiryDate: "2025-08-15",
    relatedProducts: [],
    otherNames: ["Amoxil"],
    priceHistory: [
      { date: "2024-01-01", price: 950, unit: "strip" },
      { date: "2024-05-01", price: 1000, unit: "strip" }
    ],
    invoiceCount: 32,
    mediaSource: "N/A",
    pinned: true,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
    isImported: false,
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Cough Syrup",
    type: "syrup",
    dosage: {
      pregnantAllowed: false,
      sensitive: true,
      breakdown: [
        { label: "Adult", description: "10ml 3 times daily", ageRange: "12+" },
        { label: "Child", description: "5ml 3 times daily", ageRange: "6-12" },
        { label: "Infant", description: "2.5ml 3 times daily", ageRange: "0-5" }
      ]
    },
    pricing: [
      { unit: "bottle", amount: 2500, quantity: 1 }
    ],
    stock: 45,
    expiryDate: "2025-10-30",
    relatedProducts: [],
    otherNames: ["Cough Mixture"],
    priceHistory: [
      { date: "2024-01-01", price: 2300, unit: "bottle" },
      { date: "2024-03-01", price: 2500, unit: "bottle" }
    ],
    invoiceCount: 28,
    mediaSource: "N/A",
    pinned: true,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
    isImported: false,
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  }
];

export const mockPatients = [
  {
    _id: "607f1f77bcf86cd799439011",
    name: "John Doe",
    phone: "08012345678",
    gender: "male",
    age: "adult",
    condition: "Malaria",
    healthData: {
      weight: 70,
      bloodPressure: "120/80",
      isPregnant: false,
      sugarLevel: 90,
      isInfectious: false
    },
    location: "Lagos",
    returningCount: 3,
    dosageSchedule: [
      { label: "Artemether 80mg", prescribedDate: "2024-06-01", completed: false }
    ],
    resolutionHistory: [],
    totalLoans: 1,
    totalLoanAmount: 5000,
    isResolved: false,
    notes: "Patient responding well",
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  },
  {
    _id: "607f1f77bcf86cd799439012",
    name: "Jane Smith",
    phone: "08087654321",
    gender: "female",
    age: "adult",
    condition: "Hypertension",
    healthData: {
      weight: 65,
      bloodPressure: "140/90",
      isPregnant: false,
      sugarLevel: 95,
      isInfectious: false
    },
    location: "Abuja",
    returningCount: 5,
    dosageSchedule: [
      { label: "Amlodipine 5mg", prescribedDate: "2024-05-15", completed: true }
    ],
    resolutionHistory: [],
    totalLoans: 0,
    totalLoanAmount: 0,
    isResolved: true,
    notes: "Blood pressure under control",
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-05-15T10:00:00Z",
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  }
];

export const mockLoans = [
  {
    _id: "707f1f77bcf86cd799439011",
    from: "607f1f77bcf86cd799439011",
    name: "John Doe",
    gender: "male",
    phone: "08012345678",
    location: "Lagos",
    loanBreakDown: [
      {
        id: "loan_001",
        amount: 5000,
        priceRemaining: 2000,
        payed: false,
        productName: "Paracetamol",
        quantity: "2 strips",
        description: "Emergency purchase",
        date: "2024-06-01"
      }
    ],
    amountBreakDown: {
      totalLoanCost: 5000,
      totalAmountPayed: 3000
    },
    paymentBreakDown: [
      {
        date: "2024-06-05",
        amountPaid: 2000,
        channel: "cash",
        loansCovered: ["loan_001"]
      },
      {
        date: "2024-06-10",
        amountPaid: 1000,
        channel: "bank_transfer",
        loansCovered: ["loan_001"]
      }
    ],
    loanStatus: "active",
    isOverdue: false,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-10T10:00:00Z",
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  }
];

export const mockInvoices = [
  {
    _id: "807f1f77bcf86cd799439011",
    invoiceNumber: "INV-2024-001",
    type: "selling",
    items: [
      {
        productId: "507f1f77bcf86cd799439011",
        productName: "Paracetamol 500mg",
        quantity: "2 strips",
        price: 500
      }
    ],
    totalAmount: 1000,
    customerDetails: {
      name: "John Doe",
      contactPhone: "08012345678",
      paymentAmount: 1000,
      remainingBalance: 0,
      paymentDate: "2024-06-01"
    },
    isCompleted: true,
    completedDate: "2024-06-01",
    invoiceDate: "2024-06-01",
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    syncInfo: { dataUploaded: true, mediaUploaded: false }
  }
];

export const mockNotifications = [
  {
    _id: "907f1f77bcf86cd799439011",
    title: "Product Expiring Soon",
    description: "Amoxicillin 250mg expires in 30 days",
    flag: "warning",
    from: "system",
    seen: false,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-06-15T10:00:00Z"
  },
  {
    _id: "907f1f77bcf86cd799439012",
    title: "Loan Payment Due",
    description: "John Doe has an overdue balance of ₦2000",
    flag: "error",
    from: "system",
    seen: true,
    userId: "507f1f77bcf86cd799439001",
    createdAt: "2024-06-10T10:00:00Z"
  }
];

export const mockUser = {
  _id: "507f1f77bcf86cd799439001",
  name: "Smart Pharmacy",
  email: "pharmacy@smartpharm.com",
  phone: "08012345678",
  role: "user",
  address: "123 Main Street, Lagos",
  gender: "male",
  state: "lagos",
  emailVerified: true,
  accountMode: "live",
  shopDescription: {
    name: "Smart Pharmacy",
    description: "Your trusted community pharmacy",
    type: "medium"
  },
  stats: {
    totalProducts: 45,
    totalPatients: 28,
    totalLoans: 12,
    totalInvoice: 89,
    totalNotifications: 5
  }
};