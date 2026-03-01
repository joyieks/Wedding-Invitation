# EmailJS Setup Guide for Wedding RSVP Form

Your RSVP form is configured to send responses to **poncejoanjoyd@gmail.com**

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Select "Gmail" 
4. Click "Connect Account" and sign in with **poncejoanjoyd@gmail.com**
5. Give it a name (e.g., "Wedding RSVP")
6. Note down your **Service ID** (e.g., service_abc123)

## Step 3: Create Email Template

1. Click "Email Templates" in the sidebar
2. Click "Create New Template"
3. Set the template settings:
   - **Template Name**: Wedding RSVP Submission
   - **Subject**: New Wedding RSVP from {{from_name}}
   
4. In the **Content** area, paste this template:

```
New RSVP Submission

Guest Name: {{from_name}}
Phone Number: {{phone}}
Attendance: {{attendance}}
Number of Guests: {{guests}}
Dietary Restrictions: {{dietary}}
Message: {{message}}

---
Sent from Sharon & Perry Wedding Invitation Website
```

5. In the **To Email** field, enter: `poncejoanjoyd@gmail.com`
6. Click "Save"
7. Note down your **Template ID** (e.g., template_xyz789)

## Step 4: Get Your Public Key

1. Click on your account name in the top right
2. Select "Account"
3. Find "API Keys" section
4. Copy your **Public Key** (e.g., xxxxxxxxxxxxxxxxxxxx)

## Step 5: Update Your Website Files

Open `script.js` and find line 139:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Replace with your actual Public Key:
```javascript
emailjs.init("xxxxxxxxxxxxxxxxxxxx");
```

Then find line 187:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

Replace with your actual Service ID and Template ID:
```javascript
emailjs.send('service_abc123', 'template_xyz789', {
```

## Step 6: Test Your Form

1. Open your wedding website
2. Click "RSVP NOW"
3. Fill out the form and submit
4. Check **poncejoanjoyd@gmail.com** inbox for the email

## Important Notes

- ✅ The email address field has been removed from the form (as requested)
- ✅ All form submissions will be sent to poncejoanjoyd@gmail.com
- ✅ EmailJS free plan allows 200 emails per month
- ✅ The form collects: Name, Phone, Attendance, Guests, Dietary restrictions, and Message

## Troubleshooting

**If emails are not being received:**

1. Check EmailJS dashboard > "Logs" to see if requests are being sent
2. Verify the To Email in your template is correct: poncejoanjoyd@gmail.com
3. Check your Gmail spam folder
4. Make sure you saved the template after modifying it
5. Verify your Public Key, Service ID, and Template ID are correct in script.js

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
