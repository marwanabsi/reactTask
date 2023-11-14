# Invitation Employee System

Welcome to the Invitation Employee System repository! This project is a React-based web application for managing and sending invitations to employees for different projects.

## Features

- **Project Selection:** Choose from a list of available projects.
- **Unit Selection:** Select units associated with the chosen project.
- **Role Assignment:** Assign roles (Admin or User) to the selected project.
- **Add to List:** Add selected projects with details to the list.
- **Remove from List:** Remove selected projects from the list.
- **Send Invitation:** Send invitation emails to selected projects with user details.

## Getting Started

1. Clone the repository:

git clone https://github.com/your-username/invitation-employee-system.git

## Usage
Fill in user details (First Name, Last Name, Email).
Select a project from the dropdown list.
Choose units associated with the selected project.
Assign a role (Admin or User).
Click "Add Project to List" to add the selected project to the list.
View and manage selected projects in the "Selected Projects" section.
Click "Send Invitation" to send invitation emails for the selected projects.

## API
This project uses a mock API for fetching project data.

javascript
fetch('https://mocki.io/v1/4b4bb8cd-4e16-47b7-98d5-186ae5fe6bb3')
  .then(response => response.json())
  .then(data => setData(data))
  .catch(error => console.error(error));
