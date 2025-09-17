import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useStore } from '@/lib/store'
import { OnboardingWizard } from '@/components/onboarding-wizard'
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

// Mock the store
jest.mock('@/lib/store', () => ({
  useStore: jest.fn(),
}))

describe('OnboardingWizard', () => {
  const mockSetReasons = jest.fn()
  const mockSetRole = jest.fn()
  const mockSetPlan = jest.fn()
  const mockSetStatus = jest.fn()

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      reasons: [],
      role: '',
      plan: '',
      status: 'not-started',
      setReasons: mockSetReasons,
      setRole: mockSetRole,
      setPlan: mockSetPlan,
      setStatus: mockSetStatus,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the first step correctly', () => {
    render(<OnboardingWizard />)
    
    expect(screen.getByText('Welcome to OpusClip!')).toBeInTheDocument()
    expect(screen.getByText("Let's get you set up in just a few steps.")).toBeInTheDocument()
  })

  it('allows navigation between steps', () => {
    render(<OnboardingWizard />)
    
    // Check we're on step 1
    expect(screen.getByText('Welcome to OpusClip!')).toBeInTheDocument()
    
    // Click continue button
    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)
    
    // We should still be on step 1 because no reasons are selected
    expect(screen.getByText('Welcome to OpusClip!')).toBeInTheDocument()
    
    // Select a reason
    const reasonCheckbox = screen.getByLabelText('Create short-form content')
    fireEvent.click(reasonCheckbox)
    
    // Now click continue
    fireEvent.click(continueButton)
    
    // Should move to step 2
    expect(screen.getByText("What's your role?")).toBeInTheDocument()
  })

  it('completes the onboarding flow', async () => {
    render(<OnboardingWizard />)
    
    // Step 1: Select reason
    fireEvent.click(screen.getByLabelText('Create short-form content'))
    fireEvent.click(screen.getByText('Continue'))
    
    // Wait for step 2
    await screen.findByText("What's your role?")

    // Step 2: Select role
    fireEvent.click(screen.getByLabelText('Content Creator'))
    fireEvent.click(screen.getByText('Continue'))
    
    // Wait for step 3
    await screen.findByText("Which plan interests you?")

    // Step 3: Select plan by clicking the trial button
    fireEvent.click(screen.getByText('Start 7-day Free Trial'))
    
    // Wait for step 4
    await screen.findByText("What brings you to OpusClip?")

    // Step 4: Continue
    fireEvent.click(screen.getByText('Continue'))
    
    // Wait for step 5
    await screen.findByText("You're all set!")

    // Step 5: Get started
    fireEvent.click(screen.getByText('Get Started'))
    
    // Check that setStatus was called with 'completed'
    await waitFor(() => {
      expect(mockSetStatus).toHaveBeenCalledWith('completed')
    })
  })
})