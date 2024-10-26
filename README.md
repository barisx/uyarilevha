# Using jsDelivr CDN with Git for Version Control

This tutorial will guide you through using jsDelivr CDN to serve your JavaScript files and how to update your code using the CLI with Git and tag a new version.

## Step 1: Set Up Your Git Repository

1. **Initialize a Git Repository**: If you haven't already, initialize a Git repository in your project directory.

   ```bash
   git init
   ```

2. **Add Your Files**: Add your project files to the repository.

   ```bash
   git add .
   ```

3. **Commit Your Changes**: Commit the files to the repository.
   ```bash
   git commit -m "Initial commit"
   ```

## Step 2: Push to GitHub

1. **Create a GitHub Repository**: Go to GitHub and create a new repository.

2. **Add Remote Origin**: Link your local repository to the GitHub repository.

   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```

3. **Push Your Code**: Push your code to GitHub.
   ```bash
   git push -u origin main
   ```

## Step 3: Tag a Version

1. **Create a Tag**: Create a new tag for the version you want to release.

   ```bash
   git tag v1.0.0
   ```

2. **Push Tags to GitHub**: Push the tags to GitHub.
   ```bash
   git push origin --tags
   ```

## Step 4: Use jsDelivr CDN

1. **Access Your File via jsDelivr**: Once your repository is public and tagged, you can access your files via jsDelivr. The URL format is:

   ```
   https://cdn.jsdelivr.net/gh/yourusername/your-repo-name@version/your-file.js
   ```

   Replace `yourusername`, `your-repo-name`, `version`, and `your-file.js` with your actual GitHub username, repository name, tag version, and file name.

2. **Example**: If your GitHub username is `johnDoe`, your repository is `myProject`, and your file is `script.js`, the URL would be:
   ```
   https://cdn.jsdelivr.net/gh/barisx/uyarilevha@1.1.2/index.js
   ```

## Step 5: Update Your Code and Version

1. **Make Changes**: Edit your code as needed.

2. **Commit Changes**: Add and commit your changes.

   ```bash
   git add .
   git commit -m "Updated script.js with new features"
   ```

3. **Tag a New Version**: Create a new tag for the updated version.

   ```bash
   git tag v1.1.0
   ```

4. **Push Changes and Tags**: Push your changes and the new tag to GitHub.

   ```bash
   git push origin main
   git push origin --tags
   ```

5. **Access Updated File**: Use the new version tag in the jsDelivr URL to access the updated file.
   ```
   https://cdn.jsdelivr.net/gh/johnDoe/myProject@v1.1.0/script.js
   ```

## Conclusion

By following these steps, you can efficiently manage your JavaScript files using Git and serve them via jsDelivr CDN. This approach allows you to easily update and version your code, ensuring that users always have access to the latest version.
