'use client';
import ImageUploadForm from '@/app/components/contactimageform';
import Layout from '@/app/components/Layout';
import React from 'react';

function Contact() {
  return (
    <Layout>
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Contact and Client Image Upload</h1>
      <ImageUploadForm />
    </div>
    </Layout>
  );
}

export default Contact;