# Contribution Guideline

<!-- TOC -->
* [Contribution Guideline](#contribution-guideline)
    * [Folder structuring](#folder-structuring)
    * [Updating eslint rules](#updating-eslint-rules)
<!-- TOC -->

### Folder structuring

This project is using domain-based directory architecture. As such, it utilizes Nuxt3 Layer concept to encapsulate code
instead of module.

Follow this step when you need to create a new feature. For example, we are going to work on a feature called "Shop":

1.

### Updating eslint rules

When you are updating eslint config, make sure to commit the change on its own (not mixed with other files) as in order
for it to have an effect, devs need to clear installed packaged and reinstall them.

You can run the command below (assuming on UNIX-based OS and using `npm` as package manager)

 ```bash
 rm -rf node_modules && npm i
```

