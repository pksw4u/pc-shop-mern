'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '../../../components';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/account" className="text-blue-600 hover:text-blue-800">Account</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Profile</span>
        </nav>

        <div className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile Information</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleChange('firstName', value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => handleChange('lastName', value)}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
              disabled={!isEditing}
              required
            />

            <Input
              type="tel"
              label="Phone Number"
              value={formData.phone}
              onChange={(value) => handleChange('phone', value)}
              disabled={!isEditing}
            />

            {isEditing && (
              <>
                <hr className="my-6" />
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <p className="text-gray-600 mb-4">Leave blank if you don't want to change your password</p>

                <Input
                  type="password"
                  label="Current Password"
                  value={formData.currentPassword}
                  onChange={(value) => handleChange('currentPassword', value)}
                  placeholder="Enter current password"
                />

                <Input
                  type="password"
                  label="New Password"
                  value={formData.newPassword}
                  onChange={(value) => handleChange('newPassword', value)}
                  placeholder="Enter new password"
                />

                <Input
                  type="password"
                  label="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={(value) => handleChange('confirmPassword', value)}
                  placeholder="Confirm new password"
                />
              </>
            )}

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}