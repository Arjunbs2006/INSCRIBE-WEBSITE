
PROJECT STATUS Planning & homepage design
1. Project Overview
INSCRIBE is a student-focused technical and innovation club. The project is a responsive website that introduces the
club, presents its activities and opportunities, and allows students to apply for club recruitment online. The initial
priority is to design and complete the student-facing website before connecting data services or deploying it publicly.
2. Project Objectives
• Create a clear and engaging online identity for INSCRIBE.
• Help students understand the club, its purpose, and its areas of activity.
• Present recruitment information and available opportunities.
• Provide a simple, accessible application experience across desktop and mobile devices.
• Allow club coordinators to review submitted applications through Google Sheets.
3. Visual Identity & Design Direction
Design element Selected direction
Club type Technical and innovation club
Colour palette Black / dark charcoal with orange accents
Style Minimal, clean, modern and professional
Typography Clean sans-serif typography; Inter or Space Grotesk are options
Motion Subtle transitions and restrained hover/fade effects
4. Planned Website Sections
Home / Hero: INSCRIBE introduction, main message, and clear call-to-action to explore or apply.
About: Club background, vision, mission, and what members can learn or create.
What We Do: Highlights of technology, innovation, projects, experimentation, and community.
Departments / Teams: A place to introduce the club's teams and explain their responsibilities. Final department list
is to be confirmed.
Recruitment: Recruitment announcement, eligibility, expectations, and selection-process information.
Application Form: Student details, department or role selection, relevant questions, validation, and submission
confirmation.
Contact / Footer: Official contact information and social links, once provided.
INSCRIBE | Club Recruitment Website Project Brief Page 2
5. Proposed Technology Stack
Layer Technology Purpose
Frontend React + Vite Build the website and reusable UI components
Styling CSS (Tailwind optional) Responsive layout and visual design
Client-side logic JavaScript Interactions, form state and validation
Application storage Google Sheets Store recruitment application records
Request processing Google Apps Script Provide a lightweight serverless endpoint to validate and write
submissions
Source control GitHub Version control and deployment connection
Hosting Cloudflare Pages Publish the completed React website
6. Application Data & Administration
The selected administration approach is Google Sheets rather than a separate admin dashboard. Club coordinators
will access the spreadsheet directly to review applications. A proposed Applications sheet can include: Application ID,
submission timestamp, student name, USN, email, phone, year, department or preferred role, skills, responses, and
application status. The final fields will be confirmed when the form is designed.
Important architecture note: React runs in the visitor's browser and should not contain private spreadsheet
credentials. Google Apps Script will act as a small serverless API to validate requests and write application rows to
the private spreadsheet. This avoids maintaining a traditional custom backend server, but it is still a server-side
processing component.
7. Development Roadmap
Phase 1 – Homepage design: Establish the INSCRIBE visual identity and build the homepage in React.
Phase 2 – Complete frontend: Build About, What We Do, Departments, Recruitment, Application, and Contact
sections.
Phase 3 – Frontend functionality: Implement navigation, responsive behaviour, form validation, conditional
questions, and confirmation states.
Phase 4 – Local testing: Test layout, accessibility basics, form behaviour, and mobile/desktop views locally.
Phase 5 – Google Sheets integration: Create the spreadsheet and Apps Script endpoint; connect and test
application submissions.
Phase 6 – GitHub and Cloudflare: Push the finished project to GitHub and deploy it through Cloudflare Pages.
8. Current Scope & Items to Confirm
• The club identity, category, colour palette, and minimal design direction are selected.
• React is the chosen frontend framework; Cloudflare Pages is the chosen hosting platform.
• Google Sheets is the selected application record store, with Google Apps Script handling requests.
• The exact department names, recruitment questions, eligibility rules, club logo, official description, contact links, and
recruitment dates are still to be supplied.
• The immediate next task is to inspect the existing React project and implement the homepage before deployment.
INSCRIBE | Club Recruitment Website Project Brief Page 3
IMMEDIATE NEXT
STEP
Build and refine the INSCRIBE homepage locally in React. Complete the
frontend first; 
