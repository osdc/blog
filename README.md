<div align="center">
	<img height="150" src="./content/assets/osdc.png" alt="osdc logo">
	<h1><b>OSDC Blog</b></h1>
	<p><b>The official open source developers blog - See it Live at <a href="https://osdcblog.netlify.com">https://osdcblog.netlify.com</a></b></p>
	</br>
	</br>
</div>

## Getting Started

First clone the project

`$ git clone https://github.com/osdc/blog.git osdc-blog`

Next install the dependencies and run the project. If you get any problems whilst installing, please make sure you are using Node Version 10 or above
`$ npm install && npm run dev`

When you make changes to the code, the blog will automatically update.

## Writing an Article

To write an article create a new folder that you want to be the URL slug of the blog post in `/src/pages/`
For example for a blog with the url `https://osdc.github.io/blog/hello-world`

I would create a folder called "hello-world" in `/src/pages/`

Inside this new folder create a file called `index.md` with the following contents. Change the title and date accordingly

```
---
title: Hello World
date: "2019-04-23T00:48:37.121Z"
---
```

Below this, add your article's text in Markdown!

After you have written the article, submit a new [Pull Request](https://github.com/osdc/blog/pull/new/master).

## Useful commands

Lint the project

`$ npm run lint`

Deploy the blog
`$ npm run deploy`

## License

Please see the [LICENSE](LICENSE) file for details.
