# How to Save This Project to GitHub

This file provides the step-by-step instructions to create a new GitHub repository and push your project code to it.

## Prerequisites

*   You have a GitHub account.
*   You have `git` installed on your local computer.
*   You have downloaded the source code of this project as a `.zip` file from Firebase Studio and unzipped it into a folder on your computer.

## Step 1: Create a New Repository on GitHub

1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `ai-portfolio`).
4.  Ensure the repository is set to **Public**.
5.  **Do not** initialize the repository with a `README`, `.gitignore`, or license file, as these are already included in your project.
6.  Click the **"Create repository"** button.

## Step 2: Push Your Code from the Command Line

After creating the repository, GitHub will display a page with several commands. You will use the commands listed under the section titled **"...or push an existing repository from the command line"**.

1.  Open a terminal or command prompt on your computer.
2.  Navigate into the project folder where you unzipped your code. For example:
    ```bash
    cd path/to/your/project-folder
    ```

3.  Run the following commands one by one. **Remember to replace `<your-github-username>` and `<your-repository-name>` with your actual details.**

    ```bash
    # Initialize a new Git repository in your project folder
    git init
    
    # Add all your files to be tracked by Git
    git add .
    
    # Create your first "commit" (a snapshot of your code)
    git commit -m "Initial commit: My AI Portfolio"
    
    # Tell Git where your remote GitHub repository is.
    # Use the URL provided by GitHub on your new repository's page.
    git remote add origin https://github.com/<your-github-username>/<your-repository-name>.git
    
    # Set the main branch name (optional but good practice)
    git branch -M main
    
    # Push your code from your computer to GitHub
    git push -u origin main
    ```

After running these commands, your code will be successfully uploaded and visible on your GitHub repository.
