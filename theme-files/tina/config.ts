import { defineConfig } from "tinacms";
import { config } from "./collections/_config";
import { menus } from "./collections/_menus";
import { subscription } from "./collections/_subscription";
import { about } from "./collections/about";
import { archive } from "./collections/archive";
import { author_page } from "./collections/author_page";
import { categories } from "./collections/categories";
import { contact } from "./collections/contact";
import { home } from "./collections/home";
import { homeThree } from "./collections/homeThree";
import { homeTwo } from "./collections/homeTwo";
import { privacy } from "./collections/privacy";
import { tags } from "./collections/tags";
import { author } from "./fields/author";
import { blog } from "./fields/blog";

const listCollectionUI = {
  allowedActions: {
    create: true,
    delete: true,
    createNestedFolder: false,
  }
}

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: "ADD_YOUR_ID",
  token: "ADD_YOUR_TOKEN",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      publicFolder: "",
      mediaRoot: "src/assets",
    },
  },

  search: {
    tina: {
      indexerToken: 'ADD_YOUR_INDEXER_TOKEN',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  cmsCallback: (cms) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../src/styles/_admin.css";
    document.head.appendChild(link);

    return cms;
  },

  // See docs on content modeling for more info: https://tina.io/docs/schema/
  schema: {
    collections: [
      menus,
      config,
      subscription,
      home,
      homeTwo,
      homeThree,
      about,
      author_page,
			{
				format: "mdx",
				label: "All Authors",
				name: "author",
				path: "src/content/author",
				ui: listCollectionUI,
				fields: author,
			},
			{
				format: "mdx",
				label: "Blog Posts",
				name: "blog",
				path: "src/content/blog",
				ui: listCollectionUI,
				fields: blog,
			},
      categories,
      tags,
      archive,
      contact,
      privacy,
		],
  },
});
