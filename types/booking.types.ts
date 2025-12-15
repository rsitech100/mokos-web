export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  kostId: string;
  checkInDate: string;
  checkOutDate: string;
  durationType: string;
  bookingNumber: string;
  basePrice: string;
  discount: string;
  totalPrice: string;
  promoCodeId: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  room: {
    id: string;
    kostId: string;
    roomNumber: string;
    type: string;
    capacity: number;
    inventory: number;
    size: string;
    floor: number;
    description: string;
    facilities: string[];
    images: string[];
    status: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    kost: {
      id: string;
      name: string;
      address: string;
      city: string;
    };
  };
  transaction?: Transaction;
}

export interface Transaction {
  id: string;
  bookingId: string;
  userId: string;
  kostId: string;
  amount: string;
  paymentMethod: string;
  paymentId: string;
  paymentUrl: string;
  paymentData: any;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionDate: string;
  paidAt: string | null;
  paymentProof: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  booking?: {
    id: string;
    userId: string;
    roomId: string;
    kostId: string;
    checkInDate: string;
    checkOutDate: string;
    durationType: string;
    bookingNumber: string;
    basePrice: string;
    discount: string;
    totalPrice: string;
    promoCodeId: string | null;
    status: string;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    kost: {
      id: string;
      name: string;
      city: string;
    };
  };
}
