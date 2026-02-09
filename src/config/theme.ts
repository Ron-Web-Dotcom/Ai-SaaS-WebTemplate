// Theme Configuration
// Customize your brand colors, styles, and design tokens here

export const theme = {
  // Brand Colors
  colors: {
    primary: {
      main: 'gray-900',
      hover: 'gray-800',
      light: 'gray-100',
      dark: 'gray-950',
    },
    accent: {
      main: 'blue-600',
      hover: 'blue-700',
      light: 'blue-50',
      gradient: 'from-blue-600 to-cyan-600',
    },
    text: {
      primary: 'gray-900',
      secondary: 'gray-600',
      tertiary: 'gray-500',
      inverse: 'white',
    },
    background: {
      primary: 'white',
      secondary: 'gray-50',
      dark: 'gray-900',
    },
  },

  // Spacing Scale
  spacing: {
    section: {
      mobile: 'py-16',
      desktop: 'py-24',
    },
    container: {
      padding: 'px-6 sm:px-8 lg:px-12',
      maxWidth: 'max-w-7xl',
    },
    card: {
      padding: 'p-8',
      gap: 'space-y-6',
    },
  },

  // Typography
  typography: {
    heading: {
      h1: 'text-5xl sm:text-6xl lg:text-7xl font-bold',
      h2: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
      h3: 'text-3xl sm:text-4xl font-bold',
      h4: 'text-2xl sm:text-3xl font-bold',
    },
    body: {
      large: 'text-lg sm:text-xl',
      base: 'text-base sm:text-lg',
      small: 'text-sm',
    },
  },

  // Border Radius
  borderRadius: {
    small: 'rounded-lg',
    medium: 'rounded-xl',
    large: 'rounded-2xl',
    xlarge: 'rounded-3xl',
    full: 'rounded-full',
  },

  // Shadows
  shadows: {
    small: 'shadow-sm',
    medium: 'shadow-lg',
    large: 'shadow-xl',
    xlarge: 'shadow-2xl',
  },

  // Transitions
  transitions: {
    fast: 'transition-all duration-200',
    base: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },

  // Effects
  effects: {
    hover: {
      lift: 'hover:-translate-y-1',
      scale: 'hover:scale-105',
    },
    backdrop: 'backdrop-blur-sm',
  },
};

// Helper function to get button classes
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
  const baseClasses = `px-8 py-3 ${theme.borderRadius.medium} font-medium ${theme.transitions.base} inline-flex items-center gap-2`;

  const variants = {
    primary: `bg-${theme.colors.primary.main} text-${theme.colors.text.inverse} hover:bg-${theme.colors.primary.hover}`,
    secondary: `bg-${theme.colors.accent.main} text-${theme.colors.text.inverse} hover:bg-${theme.colors.accent.hover}`,
    outline: `border-2 border-${theme.colors.primary.main} text-${theme.colors.primary.main} hover:bg-${theme.colors.primary.main} hover:text-${theme.colors.text.inverse}`,
  };

  return `${baseClasses} ${variants[variant]}`;
};

// Helper function to get card classes
export const getCardClasses = (elevated: boolean = true) => {
  return `bg-${theme.colors.background.primary} ${theme.borderRadius.large} ${theme.spacing.card.padding} ${
    elevated ? theme.shadows.medium : ''
  } ${theme.transitions.base}`;
};

// Helper function to get section classes
export const getSectionClasses = (variant: 'default' | 'dark' | 'gradient' = 'default') => {
  const baseClasses = `${theme.spacing.section.mobile} lg:${theme.spacing.section.desktop}`;

  const variants = {
    default: `bg-${theme.colors.background.primary}`,
    dark: `bg-${theme.colors.background.dark} text-${theme.colors.text.inverse}`,
    gradient: `bg-gradient-to-br ${theme.colors.accent.gradient}`,
  };

  return `${baseClasses} ${variants[variant]}`;
};
