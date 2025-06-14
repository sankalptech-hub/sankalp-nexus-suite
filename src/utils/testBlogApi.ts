
// Utility function to test the blog API endpoint
export const testBlogApi = async () => {
  const testPost = {
    title: "Test Blog Post from API",
    content: "This is a test blog post created to verify that our API endpoint is working correctly. It includes sample content and demonstrates the publishing functionality.",
    excerpt: "This is a test blog post created to verify that our API endpoint is working correctly.",
    author: "API Test",
    tags: ["test", "api", "verification"],
    status: "published"
  };

  try {
    console.log('Testing blog API...');
    const response = await fetch('https://zgytixshskvtxekxmngs.supabase.co/functions/v1/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneXRpeHNoc2t2dHhla3htbmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjkzODUsImV4cCI6MjA2NTUwNTM4NX0.mKA1jIfv-wpaOrTDD8nbagw0c0s7SMuqmAgcHOgvPXE',
      },
      body: JSON.stringify(testPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Test successful:', result);
    return result;
  } catch (error) {
    console.error('API Test failed:', error);
    throw error;
  }
};

// Test function for fetching posts
export const testFetchPosts = async () => {
  try {
    console.log('Testing fetch posts API...');
    const response = await fetch('https://zgytixshskvtxekxmngs.supabase.co/functions/v1/blog', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneXRpeHNoc2t2dHhla3htbmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjkzODUsImV4cCI6MjA2NTUwNTM4NX0.mKA1jIfv-wpaOrTDD8nbagw0c0s7SMuqmAgcHOgvPXE',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetch posts test successful:', result);
    return result;
  } catch (error) {
    console.error('Fetch posts test failed:', error);
    throw error;
  }
};
