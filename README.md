jekyll-boilerplate
==================

This is a project template for web sites which uses [Jekyll](http://jekyllrb.com/).

## Dependencies

* [Jekyll](http://jekyllrb.com/) for site generator
* [Grunt](http://gruntjs.com/) for task runner
* [Bower](http://bower.io/) for package manager


## Getting Started

```bash
npm install -g grunt-cli
npm install -g bower
gem install bundler
git clone https://github.com/hara/jekyll-boilerplate.git my-super-web-site
cd my-super-web-site
rm -rf .git
vim app/index.html
```

## Workflow

### Check

`grunt check` detects errors and warnings of the site using `jekyll doctor` and `jshint`.


### Preview

`grunt server` generates pages and runs development server.


### Build

`grunt build` generates pages and minifies assets for deployment to production environment.
Generated pages are in `dist/` directory.


## Deployment to GitHub Pages (Project Pages)

Remove existing pages.

```bash
cd my-super-web-site
rm -rf dist
```

Clone the repository to which you will deploy and create `gh-pages` branch.

```bash
git clone https://github.com/USER_NAME/PROJECT_NAME.git dist
cd dist
git checkout --orphan gh-pages
git rm -rf *
```

Build pages and push `gh-pages` branch.

```bash
cd ..
grunt build
cd dist
git add .
git commit -m "Initial commit"
git push origin gh-pages
```

