
# /public/images

This folder holds all user-uploaded images, NestiFi app screen PNGs, icons, design assets, and screenshot files.

## Usage

- **Adding assets**: Place PNGs or screenshots here. Do not add images elsewhere in the repo.
- **Referencing in code**: Use a public (relative) path, for example:  
  `/images/your-image.png`
- **Sensitive data**: Never include images with sensitive personal information.

## Image Best Practices for GitHub

- Use descriptive, lowercase filenames (`dashboard-overview.png` instead of `IMG_1200.PNG`)
- Optimize images for web (compressed PNG or JPEG ≤ 1MB)
- Remove unused/duplicate images regularly
- When referencing an image in an issue, PR, or documentation, use the raw GitHub URL or relative path, and add a short description for accessibility, e.g.:  
  `![Dashboard overview](./dashboard-overview.png)`
- Make sure screenshots or mockups don't include sensitive personal or financial information.

---

