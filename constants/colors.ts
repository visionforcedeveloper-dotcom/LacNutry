export default {
  primary: '#4FD1C5',
  primaryDark: '#38B2AC',
  primaryLight: '#81E6D9',
  secondary: '#B2F5EA',
  
  background: '#F7FAFC',
  surface: '#FFFFFF',
  
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    tertiary: '#718096',
    light: '#A0AEC0',
  },
  
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  
  success: '#48BB78',
  warning: '#ED8936',
  error: '#F56565',
  
  gradient: {
    primary: ['#4FD1C5', '#38B2AC'] as const,
    secondary: ['#81E6D9', '#4FD1C5'] as const,
    background: ['#F7FAFC', '#EDF2F7'] as const,
    purple: ['#9F7AEA', '#ED64A6'] as const,
  },
  
  shadow: {
    color: '#000',
    opacity: 0.08,
  },
};
