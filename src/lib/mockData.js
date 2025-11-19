// Mock data matching your design
export const mockContents = [
  {
    id: 'INV0938',
    serial: 'INV0938',
    creatorName: 'Nothing Studio',
    contentTitle: 'Top 10 Funniest Animal Moments of 2025',
    uploadedDate: 'Aug, 13 2023 02:29 PM',
    contentType: 'video', // 'video' or 'short'
    thumbnail: 'https://images.unsplash.com/photo-1587300411107-ec8f42d61e23?w=500&h=300&fit=crop',
    views: '42K',
    likes: '12K',
    dislikes: '12K',
    comments: '4.3 K',
    shares: '2.1K',
    reports: '1',
    duration: '8:47 / 10:00',
    description: 'Watch the most hilarious animal moments caught on camera in 2025. From funny cats to clumsy dogs, this compilation will make you laugh out loud!',
    status: 'published'
  },
  {
    id: 'INV0939',
    serial: 'INV0939',
    creatorName: 'Nothing Studio',
    contentTitle: 'Top 10 Funniest Animal Moments of 2025',
    uploadedDate: 'Aug, 13 2023 02:29 PM',
    contentType: 'short',
    thumbnail: 'https://images.unsplash.com/photo-1587300411107-ec8f42d61e23?w=500&h=300&fit=crop',
    views: '42K',
    likes: '12K',
    dislikes: '12K',
    comments: '4.3 K',
    shares: '2.1K',
    reports: '1',
    duration: '0:45 / 1:00',
    description: 'A quick burst of funny animal moments perfect for short-form content.',
    status: 'published'
  },
  // Generate 28 more items
  ...Array.from({ length: 28 }, (_, i) => ({
    id: `INV${1000 + i}`,
    serial: `INV${1000 + i}`,
    creatorName: ['Nothing Studio', 'Creative Hub', 'Media Makers', 'Studio Pro'][i % 4],
    contentTitle: [
      'Top 10 Funniest Animal Moments',
      'Tutorial: How to Edit Videos',
      'Gaming Highlights Compilation',
      'Travel Vlog: Around the World',
      'Cooking Challenge',
      'Tech Review 2025'
    ][i % 6],
    uploadedDate: `Aug, ${10 + (i % 20)} 2023 ${10 + (i % 12)}:${20 + (i % 39)} PM`,
    contentType: i % 2 === 0 ? 'video' : 'short',
    thumbnail: `https://images.unsplash.com/photo-${1500 + i * 100}?w=500&h=300&fit=crop`,
    views: `${10 + (i % 50)}K`,
    likes: `${5 + (i % 30)}K`,
    dislikes: `${1 + (i % 5)}K`,
    comments: `${2 + (i % 8)} K`,
    shares: `${1 + (i % 5)}K`,
    reports: `${i % 3}`,
    duration: i % 2 === 0 ? `${5 + (i % 8)}:${20 + (i % 39)} / 15:00` : `0:${30 + (i % 29)} / 1:00`,
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
    status: i % 5 === 0 ? 'draft' : 'published'
  }))
];