import React from 'react';
import { Transaction } from '@/types/booking.types';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Menunggu Pembayaran',
      paid: 'Lunas',
      failed: 'Gagal',
      refunded: 'Dikembalikan',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      xendit: 'Xendit Payment Gateway',
      bank_transfer: 'Transfer Bank',
      ewallet: 'E-Wallet',
      credit_card: 'Kartu Kredit',
    };
    return labels[method] || method;
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-sm font-bold mb-0.5 line-clamp-1">
                {transaction.booking?.kost.name}
              </h3>
              <p className="text-xs text-blue-100">{transaction.booking?.kost.city}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${getStatusColor(transaction.paymentStatus)}`}>
              {getStatusLabel(transaction.paymentStatus)}
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
            <p className="text-[10px] text-blue-100 mb-0.5">Total Transaksi</p>
            <p className="text-base font-bold">{formatCurrency(transaction.amount)}</p>
          </div>
        </div>
      </div>

      <div className="p-3">

        <div className="space-y-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-[10px] font-semibold text-gray-600">Booking ID</span>
            </div>
            <p className="text-xs font-bold text-gray-900">{transaction.booking?.bookingNumber}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] text-gray-600">Tanggal</span>
              </div>
              <span className="text-xs font-semibold text-gray-900">{formatDate(transaction.transactionDate)}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-[10px] text-gray-600">Metode</span>
              </div>
              <span className="text-xs font-semibold text-gray-900">{getPaymentMethodLabel(transaction.paymentMethod)}</span>
            </div>

            {transaction.paidAt && (
              <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-green-700 font-medium">Dibayar</span>
                </div>
                <span className="text-xs font-semibold text-green-900">{formatDate(transaction.paidAt)}</span>
              </div>
            )}
          </div>
        </div>

        {transaction.paymentStatus === 'pending' && transaction.paymentUrl && (
          <a
            href={transaction.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md shadow-green-600/30 hover:shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Lanjutkan Pembayaran
          </a>
        )}
      </div>
    </div>
  );
}
