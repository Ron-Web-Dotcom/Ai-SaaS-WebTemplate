# Admin Dashboard & Multiple Payment Methods

This document describes the comprehensive admin dashboard and multiple payment methods that have been added to your application.

## Features Added

### 1. Multiple Payment Methods

Users can now pay using four different payment methods:

- **Stripe (Credit/Debit Card)** - Secure card payments
- **PayPal** - PayPal account payments
- **Cryptocurrency** - Bitcoin, Ethereum, USDT via Coinbase Commerce
- **Bank Transfer** - Direct bank transfers with manual verification

#### How It Works

1. When users click on a pricing plan (Starter or Professional), they see a payment checkout modal
2. The modal displays all enabled payment methods
3. Users must accept Terms & Conditions before proceeding
4. Each payment method redirects to the appropriate payment processor
5. Enterprise plans still open an email to contact sales

### 2. Admin Dashboard

A full-featured admin dashboard for managing your SaaS platform.

#### Accessing the Admin Dashboard

1. Users with admin privileges will see an "Admin Panel" button in their regular dashboard sidebar
2. Clicking it navigates to `?admin=true` which loads the admin interface
3. Only users with `is_admin=true` and `status='active'` in their profile can access it

#### Admin Dashboard Features

**User Management**
- View all users with detailed information
- Search and filter users
- Edit user roles (promote to admin, demote to user)
- Manage user status (active, suspended, banned)
- Create new users directly
- Track last login times

**Subscription Management**
- View all subscriptions across all users
- See subscription status (trial, active, canceled, past_due)
- Filter by status and plan type
- Change subscription status manually
- View Monthly Recurring Revenue (MRR)
- Track trial users

**Analytics Dashboard**
- Total users and active users count
- Total revenue and monthly recurring revenue
- Active subscriptions count
- Usage statistics (projects, conversations)
- Conversion rates
- Average revenue per user
- Recent admin activity log

**Payment History**
- View all payment transactions
- Filter by status, payment method
- Export transactions to CSV
- See transaction details
- Track revenue by payment method

**System Settings**
- Enable/disable payment methods
- Configure trial period length
- Manage notification preferences
- Security settings
- Site-wide configuration

### 3. Database Schema Updates

New tables added:

- `payment_methods` - Stores available payment methods
- `payment_transactions` - Records all payment transactions
- `admin_activity_log` - Audit log of admin actions

Updated tables:

- `profiles` - Added `status`, `last_login`, `created_by`, `is_admin`, `admin_role` fields

### 4. Edge Functions Deployed

Three new Supabase Edge Functions:

1. **create-paypal-payment** - Handles PayPal order creation
2. **create-crypto-payment** - Handles cryptocurrency payments via Coinbase
3. **create-bank-transfer** - Generates bank transfer instructions

### 5. Security Features

- Row Level Security (RLS) policies for all tables
- Admin role verification on every request
- Audit logging of admin actions
- Secure payment processing (no card data stored)
- Terms & Conditions acceptance tracking

## How To Use

### For Regular Users

1. Browse pricing plans on the homepage
2. Click "Start Free Trial" on Starter or Professional plan
3. If not logged in, you'll be prompted to sign up
4. If logged in, a payment checkout modal appears
5. Select your preferred payment method
6. Accept Terms & Conditions
7. Complete payment with your chosen provider
8. Your subscription activates automatically

### For Administrators

1. Log in with an admin account
2. In your dashboard sidebar, click "Admin Panel"
3. Navigate between different admin sections:
   - Overview - See key metrics
   - User Management - Manage users
   - Subscriptions - Handle subscriptions
   - Payment History - View transactions
   - System Settings - Configure platform

#### Making a User an Admin

1. Go to User Management
2. Find the user you want to promote
3. Click the edit icon
4. Check "Grant Admin Access"
5. Select admin role (Admin, Super Admin, or Support)
6. Save changes

#### Managing Payment Methods

1. Go to System Settings
2. Under Payment Methods section
3. Toggle the switch for each payment method
4. Enabled methods appear in the checkout flow

## Important Notes

### Payment Processing

- **Stripe**: Requires Stripe account and API keys
- **PayPal**: Requires PayPal Business account
- **Cryptocurrency**: Uses Coinbase Commerce
- **Bank Transfer**: Manual verification required

### Trial Period

- New users get a 14-day free trial automatically
- Trial countdown shows in the dashboard when 3 days or less remain
- Users are prompted to upgrade when trial expires
- Access is restricted after trial ends until upgrade

### Admin Permissions

- Only users with `is_admin=true` can access admin dashboard
- User status must be `active`
- Admin actions are logged in `admin_activity_log` table
- Different admin roles can be assigned for future permission granularity

### Security Best Practices

1. Never commit API keys or secrets to repository
2. Secrets are automatically configured in Supabase
3. All payment data is handled by payment processors
4. No sensitive payment information is stored in your database
5. Regular security audits recommended

## Database Queries

### Find all admins
```sql
SELECT * FROM profiles WHERE is_admin = true;
```

### View recent transactions
```sql
SELECT * FROM payment_transactions
ORDER BY created_at DESC
LIMIT 10;
```

### Check admin activity
```sql
SELECT * FROM admin_activity_log
ORDER BY created_at DESC
LIMIT 20;
```

### Get subscription stats
```sql
SELECT
  plan_type,
  COUNT(*) as count,
  status
FROM subscriptions
GROUP BY plan_type, status;
```

## Troubleshooting

### Can't access admin dashboard
- Verify your profile has `is_admin=true`
- Check that your `status='active'`
- Make sure you're using `?admin=true` URL parameter

### Payment not processing
- Check edge function logs in Supabase
- Verify payment method is enabled
- Ensure API keys are configured
- Check user has accepted Terms & Conditions

### Users not seeing payment methods
- Confirm payment methods are enabled in System Settings
- Check RLS policies are correctly set
- Verify edge functions are deployed

## Next Steps

Consider implementing:
- Email notifications for failed payments
- Automatic invoice generation
- Subscription dunning management
- Multi-currency support
- Custom pricing for enterprise
- Webhook handlers for payment confirmations
- Admin dashboard analytics export
- User activity monitoring
- Advanced reporting features