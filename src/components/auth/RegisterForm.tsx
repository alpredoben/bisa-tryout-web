/* eslint-disable @typescript-eslint/no-explicit-any */
// File: ./src/components/auth/RegisterForm.tsx
import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors | any;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, register, errors, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium">Nama</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">No. HP</label>
        <input
          type="text"
          {...register('phone')}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register('password')}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Konfirmasi Password</label>
        <input
          type="password"
          {...register('confirm_password')}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('accepted')}
          className="mr-2"
        />
        <span className="text-sm">Saya menyetujui syarat dan ketentuan</span>
      </div>
      {errors.accepted && <p className="text-red-500 text-sm">{errors.accepted.message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
      >
        {isLoading ? 'Loading...' : 'Daftar'}
      </button>
    </form>
  );
};

export default RegisterForm;
