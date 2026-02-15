const disposableEmailDomains = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.com',
  'throwaway.email',
  'temp-mail.org',
  'getnada.com',
  'trashmail.com',
  'fakeinbox.com',
  'yopmail.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamailblock.com',
  'grr.la',
  'spam4.me',
  'tempr.email',
  'disposablemail.com',
  'emailondeck.com',
  'mintemail.com',
  'dispostable.com',
  'mailnesia.com',
  'discard.email',
  'mohmal.com',
  'mytemp.email',
  'temp-link.net',
  'fakemail.net',
  'throwawaymail.com',
  'mailtemporaire.fr',
  'anonbox.net',
  'emailfake.com',
  'tempinbox.com'
];

const fakeEmailPatterns = [
  /^test@/i,
  /^fake@/i,
  /^dummy@/i,
  /^sample@/i,
  /^example@/i,
  /^temp@/i,
  /^trash@/i,
  /^spam@/i,
  /^junk@/i,
  /^asdf@/i,
  /^qwerty@/i,
  /^123@/i,
  /^abc@/i,
  /^test\d+@/i,
  /@test\./i,
  /@fake\./i,
  /@example\./i,
  /@test\.com$/i,
  /@fake\.com$/i,
  /@test\.org$/i
];

const validTLDs = [
  'com', 'org', 'net', 'edu', 'gov', 'mil', 'int',
  'co', 'io', 'ai', 'app', 'dev', 'tech', 'email',
  'us', 'uk', 'ca', 'au', 'de', 'fr', 'jp', 'cn', 'in', 'br',
  'info', 'biz', 'name', 'pro', 'xyz', 'online', 'store',
  'site', 'website', 'space', 'live', 'cloud', 'me', 'tv'
];

export interface EmailValidationResult {
  valid: boolean;
  message: string;
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email || email.trim().length === 0) {
    return {
      valid: false,
      message: 'Email is required'
    };
  }

  email = email.trim().toLowerCase();

  const basicEmailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicEmailRegex.test(email)) {
    return {
      valid: false,
      message: 'Please enter a valid email address'
    };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      valid: false,
      message: 'Email must contain exactly one @ symbol'
    };
  }

  const [localPart, domain] = parts;

  if (localPart.length === 0) {
    return {
      valid: false,
      message: 'Email address cannot start with @'
    };
  }

  if (localPart.length > 64) {
    return {
      valid: false,
      message: 'Email username is too long'
    };
  }

  if (domain.length === 0 || domain.length > 255) {
    return {
      valid: false,
      message: 'Invalid email domain'
    };
  }

  if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) {
    return {
      valid: false,
      message: 'Invalid email domain format'
    };
  }

  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return {
      valid: false,
      message: 'Email domain must have a valid extension'
    };
  }

  const tld = domainParts[domainParts.length - 1].toLowerCase();
  if (!validTLDs.includes(tld)) {
    return {
      valid: false,
      message: 'Email domain has an invalid or unsupported extension'
    };
  }

  if (disposableEmailDomains.includes(domain)) {
    return {
      valid: false,
      message: 'Temporary or disposable email addresses are not allowed'
    };
  }

  for (const pattern of fakeEmailPatterns) {
    if (pattern.test(email)) {
      return {
        valid: false,
        message: 'Please use a real email address'
      };
    }
  }

  const consecutiveDots = /\.{2,}/;
  if (consecutiveDots.test(email)) {
    return {
      valid: false,
      message: 'Email cannot contain consecutive dots'
    };
  }

  const invalidChars = /[<>()[\]\\,;:\s@"]/;
  if (invalidChars.test(localPart.replace(/^"|"$/g, ''))) {
    return {
      valid: false,
      message: 'Email contains invalid characters'
    };
  }

  return {
    valid: true,
    message: 'Email is valid'
  };
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? disposableEmailDomains.includes(domain) : false;
}

export function isFakeEmailPattern(email: string): boolean {
  return fakeEmailPatterns.some(pattern => pattern.test(email.toLowerCase()));
}
