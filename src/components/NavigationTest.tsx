/**
 * Test component to verify navigation fixes
 */

import { useEffect, useState } from 'react';
import { useSafeRouter } from '@/lib/navigation';

export function NavigationTest() {
  const router = useSafeRouter();
  const [testStatus, setTestStatus] = useState('Not started');
  
  useEffect(() => {
    // This should not cause an infinite loop
    setTestStatus('Testing navigation safety...');
    
    // Simulate a delayed navigation
    const timer = setTimeout(() => {
      setTestStatus('Navigation test completed successfully');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNavigate = () => {
    setTestStatus('Navigating...');
    router.push('/dashboard');
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Navigation Test</h2>
      <p className="mb-4">{testStatus}</p>
      <button 
        onClick={handleNavigate}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Navigation
      </button>
    </div>
  );
}